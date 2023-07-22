const Message = require("../model/Message")
const User = require("../model/User")

const getFriendsController = async (req, res, next) => {
    let friends
    try {
        friends = await User.find({}, { _id: 0, firstname: 1, lastname: 1, email: 1 })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong" })
    }

    return res.status(200).json(friends)
}

const uploadMessageToDb = async (req, res, next) => {
    const {senderemail,receiveremail,message}=req.body

    if(senderemail && receiveremail ){

        const messageInserted= new Message({
            senderemail,
            receiveremail,
            message
        })

        try {
            await messageInserted.save()
        } catch (error) {
            return res.status(500).json({message:"internal server error"})
        }

        return res.status(200).json({data:messageInserted})
        
    }
    return res.status(400).json({message:"invalid data"})
}

const getmessage= async (req,res,next)=>{
    const {senderemail,receiveremail}=req.params
    if(!senderemail || !receiveremail){
        return res.status(400).json({message:"sendermail and receivermail couldn't be empty"})
    }
    let messages
    try {
        messages= await Message.find({$or: [
            { "senderemail": senderemail, "receiveremail": receiveremail },
            { "senderemail": receiveremail, "receiveremail": senderemail }
          ]})
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
    return res.status(200).json(messages)
}

exports.getFriendsController = getFriendsController
exports.uploadMessageToDb=uploadMessageToDb
exports.getmessage=getmessage