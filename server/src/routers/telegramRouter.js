require('dotenv').config();

const router = require('express').Router();
const fetch = require('node-fetch');
const { Support } = require('../../db/models');
const mailer = require('../nodeMailer');

router.get('/', async (req, res) => {
  const { userId } = req.session;
  const allUserPleasData = await Support.findAll({ where: { UserId: userId } });
  const allUserPleas = allUserPleasData.map((el) => el.dataValues);
  res.json(allUserPleas);
});

router.post('/', async (req, res) => {
  const { login } = req.session;

  function validPhone(tel) {
    const isPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(tel);
    return isPhone;
  }
  try {
    const { text, tel, telegramAcc } = req.body;
    const { userId } = req.session;

    const br = '%0A';
    const msg = `Новая заявка с сайта inGame-store:${br} _________________ ${br}${br}Имя пользователя:${br}${login}${br}${br}Id пользователя:${br}${userId}${br}${br}Телефон пользователя:${br}${tel}${br}${br}Аккаунт в Telegram:${br}${telegramAcc}${br}${br}Сообщение:${br}${text}`;
    const { CHAT_ID } = process.env;
    const { BOT } = process.env;
    const url = `https://api.telegram.org/bot${BOT}/sendMessage?chat_id=${CHAT_ID}&parse_mode=HTML&text=${msg}`;
    if (!text.trim() || !tel.trim()) {
      return res.json({ status: 'error', msg: 'Необходимо заполнить все обязательные поля *' });
    }
    if (text.length < 19) {
      return res.json({ status: 'error', msg: 'Слишком короткое сообщение. Опишите проблему подробнее. Минимум 20 символов.' });
    }
    if (!validPhone(tel)) {
      return res.json({ status: 'error', msg: 'Неправильный формат мобильного номера телефона' });
    }

    const findUserPlea = await Support.findAll({ where: { UserId: userId, status: false } });
    if (findUserPlea.length > 0) {
      return res.json({ status: 'error', msg: 'В работе может быть максимум 1 обращение, ожидайте ответ! После этого при необходимости можно будет создать еще одно обращение.' });
    }

    if (telegramAcc[0] === '@' || !telegramAcc.length) {
      await fetch(
        url,
      );
      const newPlea = await Support.create({
        question: text, answer: null, status: false, UserId: userId,
      });
      const message = {
        to: 'ingamestore.topgames@mail.ru',
        subject: `Новое обращение от пользователя ${login} id: ${userId}`,
        text: `${text}`,
      };
      mailer(message);
      return res.json({
        status: 'success',
        msg:
          'Ваша заявка принята. Ответ будет дан в течение 24 часов. Следить за статусом можно в личном кабинете',
      });
    }
    if (telegramAcc[0] !== '@') {
      return res.json({ status: 'error', msg: 'Telegram аккаунт должен начинаться с @' });
    }
  } catch (error) {
    res.status(500).json({ msg: `${error.message}` });
  }
});

module.exports = router;
