const asyncHandler = require('express-async-handler');

const Coord = require('../models/coord');

exports.check_coord = asyncHandler(async (req, res) => {
  const coord = await Coord.findOne({ name: req.params.name }).exec();

  if (!coord) {
    return res.status(404).json({
      msg: 'Invalid name',
    });
  }

  const correctGuess =
    Math.abs(req.body.x - coord.x) <= coord.tolerance &&
    Math.abs(req.body.y - coord.y) <= coord.tolerance;

  if (!correctGuess) {
    return res.status(400).json({
      msg: 'Incorrect',
    });
  }

  return res.json({
    msg: 'Success',
    coord,
  });
});
