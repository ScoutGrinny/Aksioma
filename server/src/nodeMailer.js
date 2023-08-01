const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'ingamestore.topgames@mail.ru',
      pass: process.env.MAIL_PASS,
    },
  },
  {
    from: 'inGamestore <ingamestore.topgames@mail.ru>',
  },
);

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log('Email sent: ', info);
  });
};

module.exports = mailer;
