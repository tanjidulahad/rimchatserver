const express=require("express")
const { userSignupController, userSigninController } = require("../controllers/userCotrollers")

const userRoutes=express.Router()

userRoutes.post("/signup",userSignupController)
userRoutes.post("/signin",userSigninController)

module.exports=userRoutes