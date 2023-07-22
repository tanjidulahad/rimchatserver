require("dotenv").config()
const express = require('express')
const { Server } = require("socket.io");
const mongoose = require('mongoose')
const userRoutes=require("./routes/userRoutes")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const messageRoutes = require("./routes/messageRoutes")

const app = express()
app.use(cors({credentials:true,origin:"http://localhost:5173"}))
app.use(express.json())
app.use(cookieParser())
app.use("/api",[userRoutes,messageRoutes])
const mongodbUri = process.env.MONGODB_URL

let activeUsers=[]

mongoose.connect(mongodbUri).then(() => {
    const newServer=app.listen(4000, () => {
        console.log("server is up and running...")
    })


    const addActiveUser=(data)=>{
        const isAlreadyExist=activeUsers.some((user)=>user.email==data.email)
        if(!isAlreadyExist){
            activeUsers.push(data)
        }
    }

    const removeActiveUsers=(id)=>{
        activeUsers=activeUsers.filter((user)=>user.socektId!=id)
    }

    const findUser=(email)=>{
        return activeUsers.find((user)=>user.email==email)
    }

    const io = new Server(newServer,{
        cors:{
            origin:"http://localhost:5173"
        }
    })

    io.on("connection",(socket)=>{


        socket.on("send active users",(data)=>{
            addActiveUser({socektId:socket.id,email:data})
            io.emit("receive active users",activeUsers)
        })

        socket.on("send message",(data)=>{
            console.log(data)
            console.log(activeUsers)
            const user =findUser(data.receiveremail)
            console.log(user)
            if(user){
                socket.to(user.socektId).emit("received message",data)
            }
        })


        socket.on("disconnect",(data)=>{
            removeActiveUsers(socket.id)
            console.log("user disconnected or logged out")
            io.emit("receive active users",activeUsers)
        })
    })



}).catch((error) => {
    console.log(error)
})

