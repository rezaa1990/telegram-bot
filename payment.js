const axios = require("axios");
const Payment = require("./paymentmodel");
const { Redirect } = require("twilio/lib/twiml/VoiceResponse");
const increaseCredit = async (bot, msg, amount) => {
  try {
    let params = {
      merchant_id: "6cded376-3063-11e9-a98e-005056a205be",
      amount: amount,
      callback_url: "5.120.97.56:3300",
      description: "افزایش اعتبار",
      metadata: { email: "rezaaaa.z.1991@gmail.com", mobile: "09366487149" },
    };
    const response = await axios.post(
      "https://api.zarinpal.com/pg/v4/payment/request.json",
      params
    );
    // console.log("res::",response);
    if(response.data.data.code == 100){
      // console.log("100")
      let newPayment = new Payment({
        user: msg.chat.id,
        amount: amount,
        resnumber: response.data.data.authority,
      });
      // console.log("101");
      await newPayment.save();
      // console.log("102");
      bot.sendMessage(
        msg.chat.id,
        `https://www.zarinpal.com/pg/StartPay/${response.data.data.authority}`
      );
    }else{
    bot.sendMessage(msg.chat.id, `پراخت ناموفق`);
    }

    // const paymentCallBack = async (newPayment) => {
    //   let data = {
    //     merchant_id: "6cded376-3063-11e9-a98e-005056a205be",
    //     authority: newPayment.authority,
    //     amount: 1000,
    //   };
    //   // await axios.post(`https://api.zarinpal.com/pg/v4/payment/verify.json`,data);
    // };
  } catch (err) {
    console.log(err);
  }
};
module.exports = increaseCredit;
