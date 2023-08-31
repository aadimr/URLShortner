const URLModel = require("../model/URLModel")
const shortId = require("shortid")
const validURL = require("valid-url")
const axios = require("axios")

const creatURL = async function (req, res) {
    try {
        let data = req.body
        if (!data.longUrl) return res.status(400).send({ status: false, message: "provide the details" })
        if (typeof data.longUrl !== "string" || data.longUrl.trim().length === 0) {
            return res.status(400).send({ status: false, message: "please provide a valid URL" })
        }
        if (!validURL.isUri(data.longUrl.trim())) {
            return res.status(400).send({ status: false, message: "please provide valid URL" })
        }

        let validURLCheck = await axios.get(data.longUrl.trim())
            .then(() => data.longUrl)
            .catch(() => null)

        if (!validURLCheck) return res.status(404).send({ status: false, message: `Error! Link Not Found ${data.longUrl.trim()}` })

        let url = shortId.generate().toLowerCase()
        let baseURL = "http://localhost:3000/url/"
        data.shortUrl = baseURL + url
        data.urlCode = url

        let savedata = await URLModel.create(data)
        return res.status(200).send({ status: true, message: "URL shorted successfully", data: savedata })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getAllURL = async function (req, res) {
    try {
        const allData = await URLModel.find()
        return res.status(200).send({ status: true, message: "getting all URLs successfully", data: allData })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

const getURLByUserId = async function (req, res) {
    try {
        let data = req.params.userId
        let saveData = await URLModel.find({ userId: data })
        if (!saveData) return res.status(400).send({ status: false, message: "data not exist" })
        else return res.status(200).send({ status: true, message: "got all shorted url", data: saveData })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getURLWithPath = async function (req, res) {
    try {
        let data = req.params.urlCode
        let saveData = await URLModel.findOne({ urlCode: data }).select({ longUrl: 1, _id: 0 })
        if (!saveData) return res.status(400).send({ status: false, message: "data not exist" })
        else return res.status(302).redirect(saveData.longUrl)
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = {
    creatURL,
    getAllURL,
    getURLByUserId,
    getURLWithPath,
}