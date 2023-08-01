const router = require('express').Router();
const { Op } = require('sequelize');
const { History } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const history = [];
    const { userId } = req.session;
    // const sales = await History.findAll({ where: { UserId: userId } });
    const purchaseHistory = await History.findAll({ where: { UserId: userId, purchase: { [Op.not]: null } }, raw: true, attributes: ['purchase', 'createdAt', 'id'] });
    console.log('Покупки', purchaseHistory);
    purchaseHistory.map((el) => history.push({ id: el.id ,purchase: JSON.parse(el.purchase), data: el.createdAt }));
    console.log('Массив продаж', history);
    res.json(history);
  } catch (error) {
    res.json({ msg: `${error.message}` });
  }
});

module.exports = router;
