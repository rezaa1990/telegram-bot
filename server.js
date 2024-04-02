const TelegramBot = require("node-telegram-bot-api");
const token = "7158793901:AAEb0zu8_QulYjc15wRoQX1-tlZLQlT2uyY";
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/ , msg => {
  console.log(msg);
  bot.sendMessage(msg.chat.id , 'سلام' + msg.chat.first_name + 'به ربات ما خوشآمدید')
})