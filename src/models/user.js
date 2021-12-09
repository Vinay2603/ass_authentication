const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
//*****************************  user Schema ***************** */
const userSchema = new mongoose.Schema({
   email :{type: String , required: true },
   password:{type: String , required :true , minlength:8}
  

},{
   versionKey: false,
   timestamps: true 
})
// server is faling here 
userSchema.pre("save", function (next){
 
   if(!this.isModified("password")) {return next()} // already hashed  password 

   bcrypt.hash(this.password ,8 , (err, hash )=>{
      if(err) {return next(err)}
     
      this.password = hash
      
      next()
   })
})


// to check through user model if password matches or not 
userSchema.methods.checkPassword = function(password ){
  // console.log('password:', password)
   const passwordHash = this.password
  // console.log('passwordHash:', passwordHash)
   return new  Promise((resolve, reject )=>{
      bcrypt.compare(password, passwordHash , (err,  same )=>{
         if(err) return reject(err)
         resolve (same )
      })
   })
}


module.exports = mongoose.model("user", userSchema)

 
//*****************************  user Schema ***************** */