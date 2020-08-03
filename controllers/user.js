var express = require("express");
const Products = require("../models/product");
const Users = require("../models/user");
const Cart = require("../models/cart");
const Order = require("../models/order");

exports.getAccount = (req, res, next) => {
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  const messageSucc = req.flash("success")[0];
  const messageError = req.flash("error")[0];
  Order.find({ user: req.user }).then(order => {
    res.render("account", {
      title: "Thông tin tài khoản",
      user: req.user,
      cartProduct: cartProduct,
      order: order,
      messageSucc: messageSucc,
      messageError:messageError
    });
  });
};

exports.getAccountChange = (req, res, next) => {
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  res.render("account-change-info", {
    title: "Thay đổi thông tin tài khoản",
    user: req.user,
    cartProduct: cartProduct
  });
};

exports.postAccountChange = (req, res, next) => {
  req.user.firstName = req.body.firstName;
  req.user.lastName = req.body.lastName;
  req.user.email = req.body.email;
  req.user.address = req.body.address;
  req.user.phoneNumber = req.body.phoneNumber;
  req.user.save();
  res.redirect("/account");
};


exports.getAccountList = (req, res, next) => {
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  Users.find().then(order => {
    res.render("viewAccount", {
      title: "Account List",
      user: req.user,
      order: order,
    });
  });
};


exports.viewAdmin = (req, res, next) => {
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  const messageSucc = req.flash("success")[0];
  const messageError = req.flash("error")[0];
  Products.find({ user: req.user }).then(product => {
    res.render("viewAdmin", {
      title: "Admin",
      user: req.user,
      cartProduct: cartProduct,
      prod: product,
      messageSucc: messageSucc,
      messageError:messageError
    });
  });
};
