const mongoose = require('mongoose');

const { Schema } = mongoose;

const CoordSchema = new Schema({
  name: { type: String, required: true, unique: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  tolerance: { type: Number, default: 15 },
});

module.exports = mongoose.model('Coord', CoordSchema);
