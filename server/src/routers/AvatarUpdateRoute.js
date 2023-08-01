const router = require('express').Router();
const { User } = require('../../db/models');
const fileMiddleware = require('../middlewares/file');

router.get('/account', async (req, res) => {
  try {
    const { userId } = req.session;
    const userAvatar = await User.findOne({ where: { id: userId } });
    res.json(userAvatar);
  } catch (error) {
    console.log(error);
  }
});

router.put('/account', fileMiddleware.single('avatar'), async (req, res) => {
  try {
    const { userId } = req.session;
    const newForm = JSON.parse(req.body.form);
    const {
      image, id,
    } = req.body;
    const userAvatar = await User.findOne({ where: { id: userId } });
    const updateAvatar = await userAvatar.update({ image: req.file.path });
    res.json(updateAvatar);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
