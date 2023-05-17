const User = require("../model/User")

const userSignupController = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body

    const user = new User({
        firstname,
        lastname,
        email,
        password
    })

    try {
        await user.save()
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
        
    return res.status(201).json({message:user})
}

exports.userSignupController = userSignupController