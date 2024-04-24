
const increaseCredit = (bot, msg, amount) => {
  bot.sendMessage(msg.chat.id, `مبلغ ${amount} تومان با موفقیت دریافت شد.`);
};
module.exports = increaseCredit;
