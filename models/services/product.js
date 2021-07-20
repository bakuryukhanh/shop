const ProductModel = require("../Product");
const { to } = require("await-to-js");
const ObjectId = require("mongoose").mongo.ObjectID;
const getProducts = async () => {
  const [error, products] = await to(
    ProductModel.find({ isDeleted: false }).populate("category")
  );
  if (error) {
    console.log(error);
  }
  return products;
};
const getProduct = async (PId) => {
  rPId = ObjectId(PId);
  const [error, product] = await to(
    ProductModel.findById(PId).populate("category")
  );
  if (error) {
    console.log(error);
  }
  return { ...product, collection: product.collection.name };
};
const updateProduct = async (productId, data) => {
  const id = ObjectId(productId);
  const [error] = await to(ProductModel.findByIdAndUpdate(id));
  if (error) console.log(error);
  return;
};
const newProduct = async (name, price, images, category, description) => {
  category = ObjectId(category);
  const newProduct = new ProductModel({
    name,
    price,
    images,
    category,
    description,
  });
  console.log(newProduct);
  const [error] = await to(newProduct.save());
  if (error) console.log(error);
  return;
};
const deleteProduct = async (productId) => {
  const [error] = await to(
    ProductModel.findByIdAndUpdate(productId, { isDeleted: true })
  );
  if (error) console.log(error);
};

module.exports = {
  getProducts,
  getProduct,
  updateProduct,
  addProduct: newProduct,
  deleteProduct,
};
