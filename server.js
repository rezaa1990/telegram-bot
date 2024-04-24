const TelegramBot = require("node-telegram-bot-api");
const token = process.env.tel_bot_token;
const bot = new TelegramBot(token, { polling: true });
let waitingForAmount = false;
const increaseCredit = require("./payment");
const connectDB = require("./db");
connectDB();

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
        keyboard: [["افزایش اعتبار"], ["اعتبار حساب"]],
      },
    }
  );
});

bot.on("message", async(msg) => {
  // console.log(msg);
  if (waitingForAmount) {
    // اگر در حالت دریافت مبلغ هستیم
    const amount = parseFloat(msg.text); // تبدیل متن به عدد مبلغ
    if (!isNaN(amount)) {
      // اگر متن وارد شده عددی بود
      await increaseCredit(bot, msg, amount);
      waitingForAmount = false; // خروج از وضعیت دریافت مبلغ
    } else {
      bot.sendMessage(msg.chat.id, "لطفاً یک عدد وارد کنید.");
    }
  } else {
    // اگر در حالت عادی هستیم
    if (msg.text == "my link") {
      bot.sendMessage(msg.chat.id, "this is my link");
    } else if (msg.text == "اعتبار حساب") {
      bot.sendMessage(msg.chat.id, `${0} تومان`);
    } else if (msg.text == "افزایش اعتبار") {
      bot.sendMessage(msg.chat.id, "مبلغ دلخواه را وارد کنید");
      waitingForAmount = true;
    }
  }
});
