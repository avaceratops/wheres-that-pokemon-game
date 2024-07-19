const express = require('express');

const router = express.Router();

const coordController = require('../controllers/coordController');
const scoreController = require('../controllers/scoreController');

router.post('/sessions', scoreController.add_session);
router.post('/session/:sessionId', scoreController.update_session);

router.get('/leaderboard', scoreController.get_scores);
router.post('/leaderboard', scoreController.add_score);

router.post('/coord/:name', coordController.check_coord);

module.exports = router;
