const router = require('express').Router();
const {
  Product, Lot, User, Game, Category,
} = require('../../db/models');

router.get('/:id', async (req, res) => {
  try {
    // console.log('РЕК ПАРАМС С ФРОНТА', req.params.id);
    const product = await Product.findOne(
      {
        where: { id: +req.params.id },
        include: [Category, Game],
        // include: [Category, Game, { model: Lot, include: User }],
        // include: [Category, Game, { model: Lot, where:  }],
      },
    );
    // console.log('КОНКРЕТНЫЙ ПРОДУКТ', product);
    const vendor = await Lot.findOne({ where: { ProductId: +req.params.id }, include: User });
    // console.log('USER======>', vendor.dataValues.User.dataValues.login);
    const vendorName = vendor?.dataValues.User.dataValues.login;
    res.json({ product, vendorName });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
