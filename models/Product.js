const mongoose,{ Schema, SchemaType } = require("mongoose");
const ProductSchema = new Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  images: { type: Array },
  category: { type: SchemaType.ObjectId, ref:"category" },
  decription: { type: String },
  isDeleted: {type: Boolean,defaut: false}
});
const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;
