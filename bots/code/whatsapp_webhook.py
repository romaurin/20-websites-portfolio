# WhatsApp Cloud API (Meta). Нужны: бизнес-аккаунт Meta, номер, постоянный токен.
# Запуск:  pip install flask requests
#          WA_TOKEN=... PHONE_ID=... VERIFY=любая_строка python whatsapp_webhook.py wa-nomad
# Затем укажите публичный адрес /webhook в настройках Meta (например, через ngrok).
import json, os, sys, requests
from flask import Flask, request

DATA = {b["id"]: b for b in json.load(open(os.path.join(os.path.dirname(__file__), "scripts.json"), encoding="utf8")) if b["p"] == "wa"}
S = DATA[sys.argv[1]]["steps"]
URL = f"https://graph.facebook.com/v20.0/{os.environ['PHONE_ID']}/messages"
H = {"Authorization": "Bearer " + os.environ["WA_TOKEN"]}
app = Flask(__name__)

def send(to, step):
    s = S[step]
    body = {"type": "text", "text": {"body": s["t"]}}
    if s["b"]:  # WhatsApp допускает до 3 кнопок быстрого ответа
        body = {"type": "interactive", "interactive": {"type": "button", "body": {"text": s["t"]},
                "action": {"buttons": [{"type": "reply", "reply": {"id": n, "title": l[:20]}} for l, n in s["b"][:3]]}}}
    requests.post(URL, headers=H, json={"messaging_product": "whatsapp", "to": to, **body})

@app.get("/webhook")
def verify():
    ok = request.args.get("hub.verify_token") == os.environ["VERIFY"]
    return (request.args.get("hub.challenge"), 200) if ok else ("нет доступа", 403)

@app.post("/webhook")
def hook():
    for e in request.json.get("entry", []):
        for c in e["changes"]:
            for m in c["value"].get("messages", []):
                step = m["interactive"]["button_reply"]["id"] if m["type"] == "interactive" else "start"
                send(m["from"], step if step in S else "start")
    return "ok"

app.run(port=8000)
