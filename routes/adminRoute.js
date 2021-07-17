const express = require("express");
const Router = express.Router();
Router.route("/").get((req, res) => {
  res.render("admin", { page: "dashboard" });
});
Router.route("/collection").get((req, res) => {
  res.render("admin/collection", { page: "collection" });
});
Router.route("/product").get((req, res) => {
  res.render("admin/product", { page: "product" });
});
Router.route("/customer").get((req, res) => {
  res.render("admin/customer", { page: "customer" });
});
Router.route("/order").get((req, res) => {
  res.render("admin/order", { page: "order" });
});
Router.route("/report").get((req, res) => {
  res.render("admin/report", { page: "report" });
});
module.exports = Router;
