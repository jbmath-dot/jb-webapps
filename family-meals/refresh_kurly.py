"""Refresh recent publicly visible Kurly price and sold-out status via APIFuse.
This uses the managed API key only in GitHub Actions secrets, never on the website.
Exact inventory counts and personalized delivery availability are NOT supplied.
"""
import json, os, sys, time, urllib.request
from datetime import datetime,timezone
from pathlib import Path

root=Path(__file__).resolve().parent
key=os.environ.get("APIFUSE_API_KEY","").strip()
if not key:
    print("No APIFUSE_API_KEY secret; no update.")
    sys.exit(0)
catalog=json.loads((root/"kurly-products.json").read_text(encoding="utf-8"))
now=datetime.now(timezone.utc).isoformat().replace("+00:00","Z")
quotes={}
for code, entry in catalog["products"].items():
    pid=entry.get("product_id")
    if not pid:continue
    try:
        req=urllib.request.Request(
            "https://api.frism.dev/v1/market-kurly/product-detail",
            data=json.dumps({"product_id":str(pid)}).encode("utf-8"),
            headers={"Authorization":"Bearer "+key,"Content-Type":"application/json","Accept":"application/json","User-Agent":"FamilyMealPWA/1.0"},
            method="POST")
        with urllib.request.urlopen(req,timeout=18) as res: data=json.load(res)
        item=data.get("item") or (data.get("result") or {}).get("item") or (data.get("data") or {}).get("item")
        if not isinstance(item,dict) or str(item.get("product_id"))!=str(pid):
            raise ValueError("missing/mismatched item")
        price=item.get("current_price")
        if isinstance(price,bool) or not isinstance(price,(int,float)) or price<=0:
            raise ValueError("price unavailable")
        sold=item.get("sold_out")
        quotes[code]={"product_id":str(pid),"price":int(price),"sold_out":sold if isinstance(sold,bool) else None,
                      "checked_at":now,"product_url":entry["url"],"product_name":item.get("name") or entry["name"]}
    except Exception as err:
        print("Skipped",code,type(err).__name__,str(err)[:100])
    time.sleep(0.3)
if not quotes:
    print("No verified quotes; retain previous file (client will mark stale after two hours).")
    sys.exit(0)
obj={"version":1,"source":"apifuse-market-kurly","updated_at":now,
     "status":"ok" if len(quotes)==len(catalog["products"]) else "partial","products":quotes}
(root/"kurly-price-feed.json").write_text(json.dumps(obj,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print("Verified quotes:",len(quotes))
