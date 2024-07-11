const debug = require('debug')('wtp:mongo');
const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

mongoose.set('strictQuery', false);

main()
  .then(() => debug('Connected to MongoDB'))
  .catch((err) => debug('Error connecting to MongoDB:', err));

module.exports = mongoose;
