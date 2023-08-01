/* eslint-disable max-len */
const router = require('express').Router();
const { Basket, Product, User } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    if (req.session.login) {
      const { userId } = req.session;
      const userAvatarData = await User.findOne({ where: { id: userId } });
      const userAva = userAvatarData.dataValues;

      const basketProduct = await Basket.findAll({ include: Product, where: { UserId: req.session.userId } });
      const basketWithoutData = basketProduct.map((el) => el.dataValues);
      const productData = basketWithoutData.map((el) => el.Product);
      const basket = productData.map((el) => el.dataValues);
      console.log('===>>> 👉👉👉 file: userRouter.js:17 👉👉👉 userAvatar', userAva);
      const user = {
        login: req.session.login,
        userId: req.session.userId,
        isAdmin: req.session.isAdmin,
        // image: req.session.avatarUser,
      };
      res.json({
        user,
        basket,
        userAva,
      });
    } else {
      res.json({ status: 'fail' });
    }
    // if (req.session.login) {
    //   const user = {
    //     login: req.session.login,
    //     userId: req.session.userId,
    //     isAdmin: req.session.isAdmin,
    //     image: req.session.avatarUser,
    //   };
    //   console.log(basket, user, 'posle 15 back');
    //   res.json(
    //     {
    //       user,
    //       basket,
    //     },
    //   );
    // } else {
    //   res.json(null);
    // }
    // res.json({ msg: 'ok' });
  } catch (error) {
    res.json({ msg: `${error.message}` });
  }
});

module.exports = router;
