const router = require('express').Router();
const { Product, Lot } = require('../../db/models');
const fileMiddleware = require('../middlewares/file');

router.post('/account/newLot/dota/createAcc', fileMiddleware.single('avatar'), async (req, res) => {
  try {
    const newForm = JSON.parse(req.body.form);
    const { userId } = req.session;
    const {
      name, price, GameId, CategoryId, image, description,
    } = newForm;
    const createAccCsGo = await Product.create({
      name, price, GameId, CategoryId, image: req.file.path, description,
    });
    const newLot = await Lot.create({
      UserId: userId, ProductId: createAccCsGo.dataValues.id,
    });
    res.json(createAccCsGo);
  } catch (error) {
    console.log(error);
  }
});

router.post('/account/newLot/dota/servicesCreate', fileMiddleware.single('avatar'), async (req, res) => {
  try {
    const newForm = JSON.parse(req.body.form);
    const { userId } = req.session;
    const {
      name, price, GameId, CategoryId, image, description,
    } = newForm;
    const createAccCsGo = await Product.create({
      name, price, GameId, CategoryId, image: req.file.path, description,
    });
    const newLot = await Lot.create({
      UserId: userId, ProductId: createAccCsGo.dataValues.id,
    });
    res.json(createAccCsGo);
  } catch (error) {
    console.log(error);
  }
});

router.post('/account/newLot/dota/skinsCreate', fileMiddleware.single('avatar'), async (req, res) => {
  try {
    const newForm = JSON.parse(req.body.form);
    const { userId } = req.session;
    const {
      name, price, GameId, CategoryId, image, description,
    } = newForm;
    const createAccCsGo = await Product.create({
      name, price, GameId, CategoryId, image: req.file.path, description,
    });
    const newLot = await Lot.create({
      UserId: userId, ProductId: createAccCsGo.dataValues.id,
    });
    res.json(createAccCsGo);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
