const router = require('express').Router();
const { Support } = require('../../db/models');

router.get('/', async (req, res) => {
  const allPleasData = await Support.findAll({ where: { status: false } });
  const allPleas = allPleasData.map((plea) => plea.dataValues);
  res.json({ status: 'success', allPleasData });
});
module.exports = router;

router.put('/', async (req, res) => {
  const adminMsg = req.body;
  console.log(adminMsg);
  const currentPlea = await Support.findOne({ where: { id: adminMsg.userPleaId } });
  const updatedPlea = await currentPlea.update({ answer: adminMsg.adminAnswer, status: true });
  res.json({ status: 'success', updatedPlea });
});
