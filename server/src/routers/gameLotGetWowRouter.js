const router = require('express').Router();
const { Product } = require('../../db/models');

router.get('/wow/listOfAccounts', async (req, res) => {
  try {
    const gameLots = await Product.findAll({ where: { approved: true } });

    res.json(gameLots);
    // console.log(gameLots);
  } catch (error) {
    console.log(error);
  }
});

router.get('/wow/skins', async (req, res) => {
  try {
    const gameLots = await Product.findAll({ where: { approved: true } });

    res.json(gameLots);
    // console.log(gameLots);
  } catch (error) {
    console.log(error);
  }
});
router.get('/wow/services', async (req, res) => {
  try {
    const gameLots = await Product.findAll({ where: { approved: true } });

    res.json(gameLots);
    // console.log(gameLots);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
