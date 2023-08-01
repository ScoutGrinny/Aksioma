const router = require('express').Router();
const { Product } = require('../../db/models');

router.get('/', async (req, res) => {
  const allProductsData = await Product.findAll({ where: { approved: false } });
  const allProducts = allProductsData.map((product) => product.dataValues);
  res.json(allProducts);
});

router.put('/', async (req, res) => {
  try {
    const el = req.body;
    const ourProduct = await Product.findOne({ where: { id: el.id } });
    ourProduct.update({ approved: true });
    res.json({ status: 'success' });
  } catch (error) {
    res.json({ msg: `${error.msg}` });
  }
});

router.delete('/', async (req, res) => {
  try {
    const el = req.body;
    const ourProduct = await Product.destroy({ where: { id: el.id } });
    res.json({ status: 'success' });
  } catch (error) {
    res.json({ msg: `${error.msg}` });
  }
});
module.exports = router;
