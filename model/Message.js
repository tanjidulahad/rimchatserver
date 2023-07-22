const { Timestamp } = require("mongodb")
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const messageSchema = new Schema({
    senderemail: {
        type: String,
        required: true
    },
    receiveremail: {
        type: String,
        required: true
    },
    message:{
        text:{
            type:String,
            default:""
        },
        image:{
            type:String,
            default:""
        }
    }
},{timestamps:true})

module.exports=mongoose.model("message",messageSchema)