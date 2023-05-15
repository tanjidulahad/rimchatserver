const express=require("express")

const userRoutes=express.Router()

userRoutes.get("/",(req,res,next)=>{
    res.send("user route is working")
})

module.exports=userRoutes