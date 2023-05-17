require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes=require("./routes/userRoutes")

const app = express()
app.use(express.json())
app.use("/api",userRoutes)
const mongodbUri = process.env.MONGODB_URL

mongoose.connect(mongodbUri).then(() => {
    app.listen(4000, () => {
        console.log("server is up and running...")
    })
}).catch((error) => {
    console.log(error)
})

