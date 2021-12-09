const jwt = require("jsonwebtoken")
const User = require("../models/user")

const verifyToken = (Token )=>{
     return new Promise((resolve , reject )=>{
        jwt.verify(Token , process.env.JWT_SECRET_KEY,(err, payload)=>{
            if(err) {return reject (err)}
            return resolve(payload)
        })
     })
}


const protect = async(req, res , next )=>{
    // first we need to get the token from the user 

    const bearer = req.headers.authorization

    if(!bearer || !bearer.startsWith("Bearer ")){ 
         return  res.status(401 ).json({status: "failed",
          message: "your email or password is not correct"})   }
    
    
          // we need to verify token 

   const token = bearer.split("Bearer ")[1].trim()
   console.log('token:', token)

   // retrieve the user and if user exist then good else bad token 

   let payload ;
   try{
   payload = await verifyToken(token )
   }catch(e){
    return  res.status(401 ).json({status: "failed", message: "your email or password is not correct"}) 
   }
   
   let user ;
   try{
       user = User.findById(payload.user).exec()

   }catch(e){
    return  res.status(500).json({status: "failed", message: "something went wrong "}) 
   }

   if(!user ){
    return  res.status(401 ).json({status: "failed", message: "your email or password is not correct"})
   }

   req.yser = user 
   next()
}

module.exports = protect