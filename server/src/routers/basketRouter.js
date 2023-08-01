/* eslint-disable max-len */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const {
  Basket, Product, History, Lot,
} = require('../../db/models');

router.post('/', async (req, res) => {
  const { id } = req.body;
  const { userId } = req.session;
  const itemTrue = await Basket.findOne({ where: { UserId: userId, ProductId: id } });
  console.log('ПРЕДМЕТ ДЛЯ ДОБАВЛЕНИЯ В КОРЗИНУ', id);
  const lot = await Lot.findOne({ where: { ProductId: id } });
  console.log('ПРЕДМЕТ', lot.dataValues.UserId);
  if (lot.dataValues.UserId === userId) {
    return res.json({ status: 'notAdded', msg: 'Предмет юзера' });
  }
  if (itemTrue) {
    return res.json({ status: 'error_inBasket', msg: 'Данный предмет уже находится у вас в корзине!' });
  }
  await Basket.create({
    UserId: userId,
    ProductId: id,
  });
  return res.json({ status: 'success' });
});

router.delete('/', async (req, res) => {
  const { id } = req.body;
  const { userId } = req.session;
  const deleted = await Basket.destroy({ where: { UserId: userId, ProductId: id } });
  res.json({ status: 'deleted', msg: 'Удалено из корзины' });
});

router.put('/', async (req, res) => {
  const basket = req.body;
  const { userId } = req.session;
  // console.log('ПРОДУКТЫ ПРИ ПОКУПКЕ', basket, userId);
  basket.map(async (prod) => {
    const product = JSON.stringify(prod);
    const purchase = await History.create({ UserId: userId, purchase: product });
    // console.log('СОЗДАНИЕ ЗАПИСИ В ПОКУПКАХ, АЙТИ ПРОДУКТА', purchase, prod.id);
    const vendor = await Lot.findOne({ where: { ProductId: prod.id } });
    // console.log('АЙДИ ПРОДАВЦА', vendor.dataValues.UserId);
    const sales = await History.create({ UserId: vendor.dataValues.UserId, sales: product });

    await Lot.destroy({ where: { ProductId: prod.id, UserId: vendor.dataValues.UserId } });
    await Basket.destroy({ where: { UserId: userId, ProductId: prod.id } });
    await Product.destroy({ where: { id: prod.id } });
  });
  res.json({ status: 'bought' });
});

module.exports = router;
