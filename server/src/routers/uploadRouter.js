const router = require('express').Router();
const fileMiddleware = require('../middlewares/file');

router.post('/', fileMiddleware.single('avatar'), (req, res) => {
  try {
    if (req.file) {
      res.json(req.file);
    }
  } catch (error) {
    res.status(500).json({ status: 'error', msg: `${error.message}` });
  }
});

module.exports = router;
