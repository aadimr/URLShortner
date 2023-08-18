const userModel = require("../model/userModel")
const JWT_SECRET = 'yup';
const jwt = require("jsonwebtoken")
const regEmail = /^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/
const regName = /^[A-Za-z]+(?: [A-Za-z]+)*$/
const regPswd = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-_=+\[\]{}|;:'",.<>?/])[A-Za-z\d!@#$%^&*()-_=+\[\]{}|;:'",.<>?/]{8,50}$/

const createUsers = async function (req, res) {

    try {
        let data = req.body;
        const { fullName, emailId, password, confirmPassword } = data
        if (!fullName && !emailId && !password && !confirmPassword) {
            return res.status(401).send({ status: false, message: "provide the details" })
        }
        if (!fullName) return res.status(401).send({ status: false, message: "full name is mandatory" })
        if (typeof fullName !== "string" || fullName.trim().length === 0) {
            return res.status(401).send({ status: false, message: "please provide a valid name" })
        }
        if (!fullName.match(regName)) {
            return res.status(401).send({ status: false, message: "invalid full name" })
        }

        if (!emailId) return res.status(201).send({ status: false, message: "emailId is mandatory" })
        if (!emailId.match(regEmail)) {
            return res.status(401).send({ status: false, message: "invalid email" })
        }
        let validEmailId = await userModel.findOne({ emailId })
        if (validEmailId) return res.status(401).send({ status: false, message: "email is already exist" })

        if (!password) return res.status(401).send({ status: false, message: "password is mandatory" })
        if (typeof password !== "string" || password.trim().length === 0) {
            return res.status(401).send({ status: false, message: "please provide a valid password" })
        }
        if (!password.match(regPswd)) {
            return res.status(401).send({ status: false, message: "password must contain at least one uppercase letter, one lowercase letter, one digit and one special character and the length must be between 8 to 50 characters " })
        }

        if (!confirmPassword) return res.status(401).send({ status: false, message: "confirmPassword is mandatory" })
        if (confirmPassword !== password) {
            return res.status(401).send({ status: false, message: "password must match" })
        }

        let savedata = await userModel.create(data)

        return res.status(201).send({ status: true, message: "user registered successfully", data: savedata })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}


const loginUser = async (req, res) => {
    try {
        let data = req.body
        let { emailId, password } = data
        if (!emailId && !password) return res.status(401).send({ status: false, message: "please provide the details" })
        if (!emailId) return res.status(201).send({ status: false, message: "enter your email" })
        if (!emailId.match(regEmail)) {
            return res.status(401).send({ status: false, message: "invalid email" })
        }
        if (!password) return res.status(401).send({ status: false, message: "enter your password" })
        if (typeof password !== "string" || password.trim().length === 0) {
            return res.status(401).send({ status: false, message: "please provide a valid password" })
        }
        if (!password.match(regPswd)) {
            return res.status(401).send({ status: false, message: "password must contain at least one uppercase letter, one lowercase letter, one digit and one special character and the length must be between 8 to 50 characters " })
        }
        let userExist = await userModel.findOne({ $or: [{ emailId: emailId }] })
        if (!userExist) { return res.status(404).send({ status: false, message: "User doesn't exists !" }) }
        if (userExist.password != password) { return res.status(400).send({ status: false, message: "Please enter correct password" }) }
        let token = jwt.sign({ userId: userExist._id, email: userExist.emailId, }, JWT_SECRET, { expiresIn: "1096h" })
        let saveData = {
            token: token
        }
        return res.status(200).send({ status: true, message: "User login successfull", data: saveData })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


const getUser = async (req, res) => {
    try{
     const userId = req.userExist.userId
     const user = await userModel.findById(userId).select({password:0,confirmPassword:0})
     if (!user) return res.status(404).send({ status: false, message: "User not found" })
     return res.status(201).send({status:true,message:"got user successfully",data:user})
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


module.exports = {
    createUsers,
    loginUser,
    getUser
};