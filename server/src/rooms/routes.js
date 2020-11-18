const router = require('express').Router();
const controller = require('./controller');

router.post('/', controller.saveUser);

module.exports = router;
