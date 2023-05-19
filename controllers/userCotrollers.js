const User = require("../model/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwtsecret = process.env.JWT_SECRET

const userSignupController = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body
    
    if(!firstname || !lastname || !email || !password){
        return res.status(400).json({ message: "please provide the required field" })
    }

    let existinguser

    try {
        existinguser = await User.findOne({ email })
    } catch (error) {
        console.log(error)
    }

    if (existinguser) {
        return res.status(400).json({ message: "user already exist. please signin" })
    }

    const hashedpassword = bcryptjs.hashSync(password, 8)

    const user = new User({
        firstname,
        lastname,
        email,
        password:hashedpassword
    })

    try {
        await user.save()
    } catch (error) {
        console.log(error)
    }

    return res.status(201).json({ message: "user created successfully." })
}


// sign in controller

const userSigninController = async (req, res, next) => {
    const { email, password } = req.body

    let existinguser

    try {

        existinguser = await User.findOne({ email })

    } catch (error) {
        console.log(error)
    }

    if (!existinguser) {
        return res.status(400).json({ message: "user doesn't exist. please sign up" })
    }

    const isPasswordCorrect = bcryptjs.compareSync(password, existinguser.password)

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "invalid email or password" })
    }

    const token = jwt.sign({ id: existinguser._id }, jwtsecret, {
        expiresIn: "30s"
    })

    res.cookie(String(existinguser._id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: "lax"
    })

    return res.status(200).json({ message: "user successfully logged in" })

}

const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie
    let token = []
    if (cookies) {
        token = cookies?.split("=")
    }
    if (token.length != 2) {
        return res.status(404).json({ message: "token not found" })
    }
    jwt.verify(String(token[1]), jwtsecret, (err, user) => {
        if (err) {
            return res.status(400).json({ message: "Invalid token" })
        }
        req.id = user.id
    })
    next()
}

const getUser = async (req, res, next) => {
    const userId = req.id

    let user

    try {
        user = await User.findById(userId,["firstname","lastname","email","-_id"])
    } catch (error) {
        console.log(error)
    }

    if(!user){
        return res.status(404).json({message:"user not found"})
    }

    return res.status(200).json({user})

}

exports.userSignupController = userSignupController
exports.userSigninController = userSigninController
exports.verifyToken = verifyToken
exports.getUser=getUser