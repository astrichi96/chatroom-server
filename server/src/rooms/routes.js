const router = require('express').Router();
const controller = require('./controller');

router.post('/', controller.saveRoom);
router.get('/', controller.findAll);

module.exports = router;
