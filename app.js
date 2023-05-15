require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const mongodbUri = process.env.MONGODB_URL

mongoose.connect(mongodbUri).then(() => {
    app.listen(4000, () => {
        console.log("server is up and running...")
    })
}).catch((error) => {
    console.log(error)
})

