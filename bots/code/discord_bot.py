# Запуск:  pip install -r requirements.txt
#          BOT_TOKEN=<токен из Discord Developer Portal> python discord_bot.py dc-pixel   (dc-pixel | dc-melody | dc-orbit | dc-cloudly)
# В чате введите /start — бот ответит карточкой (embed) и кнопками.
import json, os, sys
import discord
from discord import app_commands

DATA = {b["id"]: b for b in json.load(open(os.path.join(os.path.dirname(__file__), "scripts.json"), encoding="utf8")) if b["p"] == "dc"}
B = DATA[sys.argv[1]]; S = B["steps"]

def embed(s):
    head, _, rest = s["t"].partition("\n")
    return discord.Embed(title=head, description=rest, color=int(B["color"][1:], 16)) if rest else discord.Embed(description=head, color=int(B["color"][1:], 16))

class Steps(discord.ui.View):
    def __init__(self, buttons):
        super().__init__(timeout=900)
        for i, (label, nxt) in enumerate(buttons or []):
            btn = discord.ui.Button(label=label, style=discord.ButtonStyle.primary if i == 0 else discord.ButtonStyle.secondary)
            btn.callback = self.make(nxt)
            self.add_item(btn)

    def make(self, nxt):
        async def callback(inter: discord.Interaction):
            s = S[nxt]
            await inter.response.send_message(embed=embed(s), view=Steps(s["b"]))
        return callback

bot = discord.Client(intents=discord.Intents.default())
tree = app_commands.CommandTree(bot)

@tree.command(name="start", description=B["name"])
async def start(inter: discord.Interaction):
    await inter.response.send_message(embed=embed(S["start"]), view=Steps(S["start"]["b"]))

@bot.event
async def on_ready():
    await tree.sync(); print("Бот запущен:", bot.user)

bot.run(os.environ["BOT_TOKEN"])
