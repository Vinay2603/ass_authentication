const express = require("express")
const Product = require("../models/product")
const protect = require("../middleware/protect")
const router = express.Router()



//************************ product CRUD ********************** */
router.post("", async(req,res)=>{
    try{
        const product =await  Product.create(req.body)
        return res.status(200).send(product)    
 
 
    }catch(e){
        return res.status(500).json({message : e.message , status : "failed" })
    }
 })
 
router.get("/",protect, async(req,res)=>{
     const product = await Product.find({}).select("-password").exec()
     return res.status(200).json({data:product})
})


module.exports = router
