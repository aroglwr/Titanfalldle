import schedule
import time

import urllib.request as rq
import json
import random

def updateAns():
    with open("ans.json", mode="r") as f:
        data = json.load(f)
    with open("tf2.json", mode="r", encoding="utf-8") as t:
        tf = json.load(t)["keys"]
    
    latest = (int(list(data)[-1]) + 1)
    weapon = tf[str(random.randint(0, len(tf)-1))]

    data[latest] = weapon

    with open("ans.json", mode="w") as f:
        json.dump(data, f)



schedule.every().day.at("23:00:00").do(updateAns)

while True:
    schedule.run_pending()
    time.sleep(60) # wait one minute
