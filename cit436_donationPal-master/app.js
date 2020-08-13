var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const mongo = require('./services/db');


const env = require('dotenv').config();

//Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var campaignRouter = require('./routes/campaigns');

const app = express();

//Mongo class that opens connection to DB
async function startDB() {
    await mongo.init
}
startDB();


//Setup session
app.use(session({
    store: new MongoStore({
        url: process.env.MONGO_CONNECTION_STRING
        
    }),
    secret: process.env.SECRET,
    resave: true, 
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7 * 2}
}));


//Setup Passport
app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/campaigns', campaignRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
