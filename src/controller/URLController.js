const URLModel = require("../model/URLModel")
const shortId = require("shortid")
const validURL = require("valid-url")
const axios = require("axios")

const creatURL = async function (req, res) {
    try {
        let data = req.body
        if (!data.longUrl) return res.status(401).send({ status: false, msg: "provide the details" })
        if (typeof data.longUrl !== "string" || data.longUrl.trim().length === 0) {
            return res.status(401).send({ status: false, msg: "please provide a valid URL" })
        }
        if (!validURL.isUri(data.longUrl.trim())) {
            return res.status(401).send({ status: false, msg: "please provide valid URL" })
        }

        let validURLCheck = await axios.get(data.longUrl.trim())
            .then(() => data.longUrl)
            .catch(() => null)

        if (!validURLCheck) return res.status(404).send({ status: false, msg: `Error! Link Not Found ${data.longUrl.trim()}` })

        let url = shortId.generate().toLowerCase()
        let baseURL = "http://localhost:3000/"
        data.shortUrl = baseURL + url
        data.urlCode = url

        let savedata = await URLModel.create(data)
        return res.status(201).send({ status: true, msg: savedata })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

const getURL = async function (req, res) {
    try {
        let data = req.params
        let { _id } = data
        if (_id) {
            data._id = _id
        }
        let saveData = await URLModel.find(data)
        if (!saveData) return res.status(401).send({ status: false, msg: "data not exist" })
        else return res.status(201).send({ status: true, msg: saveData })
    }
    catch (err) {
        return res.status(500).send({status:false, msg:err.message})   
    }
}

module.exports = {
    creatURL,
    getURL
}