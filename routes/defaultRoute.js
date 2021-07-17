const express = require("express");
const Router = express.Router();
Router.route("/").get((req, res) => {
  res.render("default/Home");
});
Router.route("/login").get((req, res) => {
  res.render("default/Login");
});
Router.route("/product").get((req, res) => {
  res.render("default/Product");
});
Router.route("/test").get((req, res) => {
  res.render("default/Product/Single");
});
Router.route("/user").get((req, res) => {
  res.render("default/UserInfo");
});
Router.route("/cart").get((req, res) => {
  res.render("default/Cart");
});
module.exports = Router;
