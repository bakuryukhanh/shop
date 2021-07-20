const Router = require("express").Router();
const SProduct = require("../models/services/product");
const formidable = require("formidable");
const { to } = require("await-to-js");
const uploadImage = require("../models/services/uploadImage");
Router.route("/")
  .get(async (req, res) => {
    const products = await SProduct.getProducts();
    return res.json(products);
  })
  .post(async (req, res) => {
    const form = formidable.IncomingForm();
    const fieldObject = {};
    const fileArray = [];
    form.on("field", (field, value) => {
      console.log(field, value);
      fieldObject[field] = value;
    });
    form.on("file", (field, file) => {
      console.log(file.name);
      fileArray.push(file);
    });
    form.on("end", () => {
      console.log("end");
    });
    await form.parse(req, async (err, fields, files) => {
      if (err) return res.json(err);
      const imgSrcs = [];
      for (const file of fileArray) {
        if (file.size > 0) {
          const [err, imgUrl] = await to(uploadImage(file.path));
          if (err) console.log(err);
          imgSrcs.push(imgUrl);
        }
      }
      const [error] = await to(
        SProduct.addProduct(
          fieldObject.name,
          fieldObject.price,
          imgSrcs,
          fieldObject.category,
          fieldObject.description
        )
      );
      return res.json({ ...fieldObject, imgSrcs });
    });
  });
module.exports = Router;
