# Запуск:  pip install -r requirements.txt
#          BOT_TOKEN=<токен от @BotFather> python bot.py nova      (nova | basil | cura | pulse | altair | signal)
import asyncio, json, os, sys
from aiogram import Bot, Dispatcher
from aiogram.filters import CommandStart
from aiogram.types import Message, CallbackQuery, InlineKeyboardMarkup, InlineKeyboardButton

DATA = {b["id"]: b for b in json.load(open(os.path.join(os.path.dirname(__file__), "scripts.json"), encoding="utf8")) if b["p"] == "tg"}

def kb(buttons):
    if not buttons: return None
    return InlineKeyboardMarkup(inline_keyboard=[[InlineKeyboardButton(text=l, callback_data=n)] for l, n in buttons])

async def main():
    steps = DATA[sys.argv[1]]["steps"]
    bot, dp = Bot(os.environ["BOT_TOKEN"]), Dispatcher()

    @dp.message(CommandStart())
    async def start(m: Message):
        await m.answer(steps["start"]["t"], reply_markup=kb(steps["start"]["b"]))

    @dp.callback_query()
    async def press(c: CallbackQuery):
        s = steps[c.data]
        await c.message.answer(s["t"], reply_markup=kb(s["b"]))
        await c.answer()

    await dp.start_polling(bot)

asyncio.run(main())
