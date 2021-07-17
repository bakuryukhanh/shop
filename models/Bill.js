const mongoose,{ Schema, SchemaType } = require("mongoose");
const BillSchema = new Schema({ 
    products: {type: Array},
    total: {type: Number},
    creationDate: {type: Date,default: Date.now()},
})
const BillModel = mongoose.model("Bill",BillSchema)
module.exports = BillModel;