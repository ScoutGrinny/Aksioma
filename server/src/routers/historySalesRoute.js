const router = require('express').Router();
const { Op } = require('sequelize');
const { History } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const history = [];
    const { userId } = req.session;
    // const sales = await History.findAll({ where: { UserId: userId } });
    const salesHistory = await History.findAll({ where: { UserId: userId, sales: { [Op.not]: null } }, raw: true, attributes: ['sales', 'createdAt', 'id'] });
    console.log('Продажи', salesHistory);
    salesHistory.map((el) => history.push({id: el.id, sales: JSON.parse(el.sales), data: el.createdAt }));
    console.log('Массив продаж', history);
    res.json(history);
  } catch (error) {
    res.json({ msg: `${error.message}` });
  }
});

module.exports = router;
