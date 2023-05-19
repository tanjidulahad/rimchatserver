require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes=require("./routes/userRoutes")
const cookieParser=require("cookie-parser")
const cors=require("cors")

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api",userRoutes)
const mongodbUri = process.env.MONGODB_URL

mongoose.connect(mongodbUri).then(() => {
    app.listen(4000, () => {
        console.log("server is up and running...")
    })
}).catch((error) => {
    console.log(error)
})

