const nodemailer = require("nodemailer");

const sendEmail = async (mailOptions) => {
  let transporter = await nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  return await transporter.sendMail(mailOptions);
};
module.exports = {
  sendEmail,
};
