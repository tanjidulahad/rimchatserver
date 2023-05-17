const express=require("express")
const { userSignupController } = require("../controllers/userCotrollers")

const userRoutes=express.Router()

userRoutes.post("/signup",userSignupController)

module.exports=userRoutes