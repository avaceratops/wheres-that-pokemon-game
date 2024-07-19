const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const Score = require('../models/score');

const timers = {};

exports.add_session = (req, res) => {
  const sessionId = uuidv4();
  const now = Date.now();

  timers[sessionId] = { startTime: now, endTime: -1 };
  res.send({ msg: 'Timer started', sessionId, startTime: now });
};

exports.get_session = (req, res) => {
  const { sessionId } = req.params;
  if (!timers[sessionId]) {
    return res.status(400).send({ msg: 'Invalid session' });
  }
  return res.send({ msg: 'Start time', session: timers[sessionId] });
};

exports.update_session = (req, res) => {
  const { sessionId } = req.params;
  if (!timers[sessionId]) {
    return res.status(400).send({ msg: 'Invalid session' });
  }
  timers[sessionId].endTime = Date.now();
  return res.send({ msg: 'Session updated', session: timers[sessionId] });
};

exports.get_scores = asyncHandler(async (req, res) => {
  const scores = await Score.find().sort({ score: 1 }).limit(50).exec();
  return res.json({ msg: 'Leaderboard', scores });
});

exports.add_score = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name must not be empty'),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, sessionId } = req.body;
    if (!timers[sessionId]) {
      return res.status(400).send({ errors: [{ msg: 'Invalid session' }] });
    }

    const { startTime, endTime } = timers[sessionId];
    const completionTime = endTime - startTime;
    const score = new Score({ name, score: completionTime });
    await score.save();

    return res.json({ msg: 'Score added' });
  }),
];
