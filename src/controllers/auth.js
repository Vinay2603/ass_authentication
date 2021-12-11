const jwt = require("jsonwebtoken")
require("dotenv").config();
const User = require("../models/user")


const newToken = (user)=>{
    return jwt.sign({user :user}, process.env.JWT_SECRET_KEY  )
}
const signup = async(req,res)=>{
   
    try{
        const user = await User.create(req.body)
      
        const token =   newToken(user)
      
        return res.status(201).json({data:{token}})
    }catch(e){
        return res.status(500).json({message :"Something went wrong" , status:"failed"})
    }
   
}

const signin = async(req,res)=>{
//     // we will find the user with the email
   let  user 

    try{

        user = await User.findOne({   email: req.body.email   }).exec() 
        console.log('user:', user)
        if(!user ) return res.status(401).json({status : "failed" , message: "your email or password is not correct"})
    
     

    }catch(e){
        return res.status(500).json({message :"Something went wrong" , status:"failed"})
    }
   
    try{
       
      
      // we will try to match the password the use has with the password stored in the system 
     
       const match = await user.checkPassword(req.body.password )
        
       if(! match ) return res.status(401 ).json({status: "failed", message: "your email or password is not correct"})


    }catch(e){
        return res.status(500).json({message :"Something went wrong" , status:"failed d"})
    }



  // create a new token and return it    
  const token = newToken(user )
  return res.status(201).json({data :{token }})


 }

module.exports = {
    signup, 
    signin

}