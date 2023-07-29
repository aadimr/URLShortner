const express = require("express");
const router = express.Router();
const { createUsers } = require("../controller/userController");
const { creatURL,getAllURL,getURLWithPath } = require("../controller/URLController");


router.post("/users", createUsers);
router.post("/url/shorten", creatURL);
router.get("/getURL", getAllURL);
router.get("/:urlCode", getURLWithPath);

module.exports = router