const express = require("express");
const router = express.Router();
const { createUsers, loginUser, getUser } = require("../controller/userController");
const { creatURL, getAllURL, getURLWithPath, getURLByUserId } = require("../controller/URLController");
const { fetchuser } = require("../middleware/fetchUser")


router.post("/users", createUsers);
router.post("/loginUser", loginUser);
router.post("/getUsers", fetchuser, getUser)
router.post("/shortenUrl", creatURL);
router.get("/getURL", getAllURL);
router.get("/user/:userId", getURLByUserId);
router.get("/url/:urlCode", getURLWithPath);

module.exports = router