const User = require("../model/User")

const userSignupController = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body

    let existinguser

    try {
        existinguser= await User.findOne({email})
    } catch (error) {
        console.log(error)
    }

    if(existinguser){
        return res.status(400).json({message:"user already exist. please signin"})
    }

    const user = new User({
        firstname,
        lastname,
        email,
        password
    })

    try {
        await user.save()
    } catch (error) {
        console.log(error)
    }
        
    return res.status(201).json({message:user})
}

exports.userSignupController = userSignupController