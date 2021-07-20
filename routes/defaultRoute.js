const express = require("express");
const Router = express.Router();
const User = require("../models/User");
const { to } = require("await-to-js");
const productController = require("../controllers/default/product");
const homeController = require("../controllers/default");
Router.route("/").get(homeController.getIndex);
Router.route("/login").get((req, res, next) => {
  res.render("default/Login");
});
Router.route("/register").post(async (req, res) => {
  const data = req.body;
  const newUser = new User(data);
  const [err] = await to(newUser.save());
  console.log(newUser);

  if (err) res.json(err);
  return res.end("done");
});
Router.route("/product").get(productController.getIndex);
Router.route("/product/:id").get(productController.getSingle);

Router.route("/test").get((req, res) => {
  res.render("default/Product/Single");
});
Router.route("/user").get((req, res) => {
  res.render("default/UserInfo");
});
Router.route("/cart").get(productController.getCart);
module.exports = Router;
