const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Basket, Product } = require('../../db/models');

router.post('/', async (req, res) => {
  const { login, password } = req.body;
  try {
    const userAuth = await User.findOne({ where: { login } });
    if (!login.trim() || !password.trim()) {
      return res.json({ status: 'error', msg: 'Необходимо заполнить все поля' });
    }
    if (userAuth) {
      const validPassword = await bcrypt.compare(password, userAuth.password);
      if (validPassword) {
        req.session.login = userAuth.login;
        req.session.userId = userAuth.id;
        req.session.avatarUser = userAuth.image;
        req.session.isAdmin = userAuth.isAdmin;
        // return res.json({
        //   status: 'success',
        //   msg: 'Успешный вход',
        //   login: req.session.login,
        //   userId: req.session.userId,
        //   isAdmin: req.session.isAdmin,
        //   image: req.session.avatarUser,
        // });
        // console.log('СЕССИЯ', req.session.userId);
        const basketProduct = await Basket.findAll(
          { include: Product, where: { UserId: req.session.userId } },
        );
        // console.log('Корзина', basketProduct);
        const basketWithoutData = basketProduct.map((el) => el.dataValues);
        const productData = basketWithoutData.map((el) => el.Product);
        const basket = productData.map((el) => el.dataValues);
        const user = {
          login: req.session.login,
          userId: req.session.userId,
          isAdmin: req.session.isAdmin,
          image: req.session.avatarUser,
        };
        return res.json({
          user,
          basket,
          msg: 'Успешный вход',
          status: 'success',
        });
      }
    }
    return res.json({ status: 'error', msg: 'Неправильный логин или пароль' });
  } catch (error) {
    res.status(500).json({ msg: `${error.msg}` });
  }
});

module.exports = router;
