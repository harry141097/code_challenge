var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
const api = require('./routes/api');
const RedisProcess = require('./process/redis');
const moment = require('moment');
const fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
// require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  const time = moment().format('YYYY/MM/DD HH:mm:ss')
  const params = JSON.stringify(req.body)
  const content = `${time}: ${req.url} + ${err.message} + ${params}` + "\n"
  fs.appendFile('ERR_LOG.txt', content, 'utf8', (err, res) => {
    if (err) throw new Error(err)
    else return res
  })
  // render the error page
  res.status(err.status || 500);
  // res.render('error')
  res.json({
    success: false,
    error: err.message});
});

app.listen(config.port, function () {
  console.log('\033[33mExpress server listening on port \033[32m' + config.port)
  RedisProcess.start();
});

module.exports = app;
