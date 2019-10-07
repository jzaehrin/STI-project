const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const usersRouter = require('./routes/users');
const messageRouter = require('./routes/message');
const loginRouter = require('./routes/login');

const authMiddleware = require('./middleware/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
// API start
app.use('/login', loginRouter);

// auth middleware
app.use(authMiddleware);

app.use('/user', userRouter);
app.use('/users', usersRouter);
app.use('/message', messageRouter);

module.exports = app;
