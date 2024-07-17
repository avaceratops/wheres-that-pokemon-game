const express = require('express');

const router = express.Router();

const coordController = require('../controllers/coordController');

router.post('/coord/:name', coordController.check_coord);

module.exports = router;
