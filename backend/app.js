var express = require('express');
var history = require('connect-history-api-fallback');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/user');
var usersRouter = require('./routes/users');
var messageRouter = require('./routes/message');
var loginRouter = require('./routes/login');

var authMiddleware = require ('./middleware/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Middleware for serving '/public' directory
const staticFileMiddleware = express.static('public');
// 1st call for unredirected requests 
app.use(staticFileMiddleware);

// Support history api 
app.use(history({
  index: '/public/index.html'
}));

// 2nd call for redirected requests
app.use(staticFileMiddleware);

// API start
app.use('/login', loginRouter);

// auth middleware
app.use(authMiddleware);

app.use('/user', userRouter);
app.use('/users', usersRouter);
app.use('/message', messageRouter);

module.exports = app;
