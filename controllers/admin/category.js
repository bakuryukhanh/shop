const SCategory = require("../../models/services/category");
const { to } = require("await-to-js");
const getIndex = async (req, res, next) => {
  const [error, categories] = await to(SCategory.getCategoriesBaseInfo());
  if (error) {
    console.log(error);
    return res.send("error occur");
  }
  const Fcategories = categories.map((category) => {
    return { ...category, productsCount: category.products.length };
  });
  return res.render("admin/category", {
    page: "category",
    categories: Fcategories,
  });
};
const getEdit = async (req, res, next) => {
  const [error, category] = await to(SCategory.getCategory(req.params.id));
  if (error) {
    console.log(error);
    return res.send("error occur");
  }
  return res.render("admin/category/edit", {
    page: "category",
    category: category,
  });
};
module.exports = { getIndex, getEdit };
