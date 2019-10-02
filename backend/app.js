var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
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

app.use('/', indexRouter);
app.use('/login', loginRouter);

// auth middleware
app.use(authMiddleware);

app.use('/user', userRouter);
app.use('/users', usersRouter);
app.use('/message', messageRouter);

module.exports = app;
