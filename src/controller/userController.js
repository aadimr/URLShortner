const userModel = require("../model/userModel")
const regEmail = /^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/
const regName = /^[A-Za-z]+(?: [A-Za-z]+)*$/
const regPswd = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-_=+\[\]{}|;:'",.<>?/])[A-Za-z\d!@#$%^&*()-_=+\[\]{}|;:'",.<>?/]{8,50}$/

const createUsers = async function (req, res) {

    try {
        let data = req.body;
        const { fullName, emailId, password, confirmPassword } = data
        if (!fullName && !emailId && !password && !confirmPassword) {
            return res.status(401).send({ status: false, msg: "provide the details" })
        }
        if (!fullName) return res.status(201).send({ status: false, msg: "full name is mandatory" })
        if (typeof fullName !== "string" || fullName.trim().length === 0) {
            return res.status(401).send({ status: false, msg: "please provide a valid name" })
        }
        if (!fullName.match(regName)) {
            return res.status(401).send({ status: false, msg: "invalid full name" })
        }

        if (!emailId) return res.status(201).send({ status: false, msg: "emailId is mandatory" })
        if (!emailId.match(regEmail)) {
            return res.status(401).send({ status: false, msg: "invalid email" })
        }
        let validEmailId = await userModel.findOne({ emailId })
        if (validEmailId) return res.status(401).send({ status: false, msg: "email is already exist" })

        if (!password) return res.status(401).send({ status: false, msg: "password is mandatory" })
        if (typeof password !== "string" || password.trim().length === 0) {
            return res.status(401).send({ status: false, msg: "please provide a valid password" })
        }
        if (!password.match(regPswd)) {
            return res.status(401).send({ status: false, msg: "password is not strong" })
        }

        if (!confirmPassword) return res.status(401).send({ status: false, msg: "confirmPassword is mandatory" })
        if (confirmPassword !== password) {
            return res.status(401).send({ status: false, msg: "password must match" })
        }

        let savedata = await userModel.create(data)
        return res.status(201).send({ status: true, msg: savedata })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}


module.exports = {
    createUsers
};