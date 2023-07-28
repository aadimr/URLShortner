const express = require("express");
const router = express.Router();
const { createUsers } = require("../controller/userController");
const { creatURL,getURL } = require("../controller/URLController");


router.post("/users", createUsers);
router.post("/url/shorten", creatURL);
router.get("/getShortURL", getURL);

module.exports = router