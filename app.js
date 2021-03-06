require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const shopRouter = require('./routes/shop');
const productRouter = require('./routes/product')
const authRouter = require('./routes/auth');
const flash = require('connect-flash');
const app = express();
const Cart = require('./models/cart');
const compression = require('compression');
app.use(compression());
mongoose.set('useCreateIndex', true);

var url = process.env.MONGOLAB_URI;
var urlConnect = "mongodb+srv://happykid_uit:happykid_uit@cluster0.bly9c.mongodb.net/test?retryWrites=true&w=majority";
// Connect to database
mongoose.connect(urlConnect, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (err) throw err;
  console.log('Connect successfullyy!!');
});
// view engine setup
app.use('/uploads', express.static('uploads'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(flash());
app.use(
  session({
    secret: 'notsecret',
    saveUninitialized: true,
    resave: false,
  })
);

app.use((req, res, next) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  req.session.cart = cart;
  res.locals.session = req.session;
  next();
});
app.use(passport.initialize());
app.use(passport.session());

app.use(shopRouter);
app.use(authRouter);
app.use(productRouter);


// pass passport for configuration
require('./config/passport')(passport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { cartProduct: cartProduct });
});

module.exports = app;
