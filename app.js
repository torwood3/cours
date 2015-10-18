/**
 * Created by plume on 25/07/2015.
 */
var express     = require('express');
var path        = require('path');
var logger      = require('morgan');
var bodyParser  = require('body-parser');
var flash       = require('connect-flash');


//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

/****************************************************
 * Express Settings
 **************************************************/
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCrossDomain);
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/pdf', express.static(path.join(__dirname, 'pdf')));
app.use(require('compression')());

/****************************************************
 * Routes API
 **************************************************/
var routes = require('./routes')();
var todoRoutes = require('./todoRoutes')();

app
  .use('/', routes)
  .use('/api/todo', todoRoutes);


/****************************************************
 * Error handlers
 **************************************************/
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development')
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
else
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

module.exports = app;

