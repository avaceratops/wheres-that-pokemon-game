const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const createError = require('http-errors');
const debug = require('debug')('wtp:app');
const express = require('express');
const logger = require('morgan');
require('dotenv').config();

const apiRouter = require('./routes/api');
require('./config/mongoConfig'); // connect to MongoDB

const app = express();
app.set('trust proxy', 1); // needed for Railway hosting

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());

// routes
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  debug(err);

  // return error as json
  res.status(err.status || 500);
  res.json(res.locals);
});

module.exports = app;
