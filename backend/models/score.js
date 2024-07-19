const mongoose = require('mongoose');

const { Schema } = mongoose;

const ScoreSchema = new Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
});

module.exports = mongoose.model('Score', ScoreSchema);
