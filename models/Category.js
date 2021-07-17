const mongoose,{ Schema, SchemaType } = require("mongoose");
const CategorySchema = new Schema({
    name: {type: String,required: true, unique:true},
    decription: {type: String},
    thumbnailImg:{type: String}

})
const CategoryModel = mongoose.model("Category",CategorySchema)