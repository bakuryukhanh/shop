const SProduct = require("../../models/services/product");
const SCategory = require("../../models/services/category");
const { to } = require("await-to-js");
const getIndex = async (req, res, next) => {
  const [error, products] = await to(SProduct.getProducts());
  if (error) {
    console.log(error);
    return res.send("error occurs");
  }
  return res.render("admin/product", { page: "product", products: products });
};
const getCreate = async (req, res, next) => {
  const [error, categories] = await to(SCategory.getCategories());
  const Fcategories = categories.map((cate) => {
    return { _id: cate._id, name: cate.name };
  });
  return res.render("admin/product/create", {
    page: "product",
    categories: Fcategories,
  });
};
module.exports = { getIndex, getCreate };
