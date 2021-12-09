const mongoose = require("mongoose")
//*****************************  product Schema ***************** */
const productSchema = new mongoose.Schema({
    title  :{type: String , required: true },
    body:{type: String , required :true , minlength:8},
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"user",
      required: true 
    }

},{
   versionKey: false,
   timestamps: true 
})

module.exports = mongoose.model("product", productSchema)

 
//*****************************  product Schema ***************** */