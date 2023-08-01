const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

router.post('/', async (req, res) => {
  try {
    const {
      login, email, password, confirmPassword,
    } = req.body;
    console.log('===>>> 👉👉👉 file: regRouter.js:10 👉👉👉 req.body', req.body);

    if (!login.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      return res.json({ status: 'error', msg: 'Необходимо заполнить все поля' });
    }

    const userEmail = await User.findOne({ where: { email } });
    if (userEmail) {
      return res.json({ status: 'error', msg: 'Пользователь с таким e-mail адресом уже существует' });
    }

    const userLogin = await User.findOne({ where: { login } });
    if (userLogin) {
      return res.json({ status: 'error', msg: 'Пользователь с таким логином уже существует' });
    }

    if (password.length < 4) {
      return res.json({ status: 'error', msg: 'Пароль должен быть больше 3 символов' });
    }
    if (password !== confirmPassword) {
      return res.json({ status: 'error', msg: 'Пароли не совпадают' });
    }

    if (password === confirmPassword) {
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({ login, email, password: hash });
      req.session.login = newUser.login;
      req.session.userId = newUser.id;
      req.session.isAdmin = newUser.isAdmin;
      req.session.avatarUser = newUser.image;
      return res.json({
        status: 'success',
        msg: 'Успешная регистрация',
        login: req.session.login,
        userId: req.session.userId,
        isAdmin: req.session.isAdmin,
        image: req.session.avatarUser,
      });
    }
  } catch (error) {
    res.json({ msg: `${error.message}` });
  }
});

module.exports = router;
