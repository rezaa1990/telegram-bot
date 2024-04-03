const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

// بررسی مقدار توکن
if (!token) {
  console.error("Telegram bot token is not provided!");
  process.exit(1); // خروج با کد خطا
}

bot.onText(/\/start/, (msg) => {
  console.log(msg);
  bot.sendMessage(
    msg.chat.id,
    "سلام " + msg.chat.first_name + " به ربات ما خوشآمدید",
    {
      reply_markup: {
        keyboard: [["my link"], ["about us"] ,["mypic"]],
      },
    }
  );
});

bot.on("message", (msg) => {
  console.log(msg.text);
  if (msg.text == "my link") {
    bot.sendMessage(msg.chat.id, "this is my link");
  } else if (msg.text == "mypic") {
    bot.sendPhoto(
      msg.chat.id,
      "AgACAgQAAxkBAAMOZgzvnGd4N2rR7a-rB-I_EVfxKdwAAvfAMRuaXWlQTFLEUp76ihABAAMCAAN5AAM0BA"
    );
  } else if (msg.text == "about us") {
    bot.sendMessage(msg.chat.id, "here : about us");
  }
});


