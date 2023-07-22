const express=require("express")
const { getFriendsController, uploadMessageToDb, getmessage } = require("../controllers/messageController")

const messageRoutes=express.Router()

messageRoutes.get("/getfriends",getFriendsController)
messageRoutes.post("/sendmessage",uploadMessageToDb)
messageRoutes.get("/getmessage/:senderemail&:receiveremail",getmessage)

module.exports=messageRoutes