const router = require('express').Router();
const publicController = require('../controllers/Public');

router.get('/', publicController.index);

module.exports = router;