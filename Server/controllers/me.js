const express =require("express")
const router = express.Router()
const verifyTokens=require("../middleware/tokenVerify")
const UserStorage = require("../models/storeage")





router.get("/api/me",verifyTokens,(req,res)=> {
     const User=req.user.email

     const UserFromStroge = UserStorage.get(User.email);

     if(!UserFromStroge) {
        return res.status(404).json({message:"User not found"})

     }

res.json({
    success:true,
    UserFromStroge:{
        id:UserFromStroge.id,
        fullName:UserFromStroge.fullName,
        email:UserFromStroge.email,
        bussinessName:UserFromStroge.bussinessName,
        businessType:UserFromStroge.businessType,
        role:UserFromStroge.role
    }
})

})


module.exports=router


























