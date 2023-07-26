const express = require("express");
const router = express.Router();
const { createUsers } = require("../controller/userController");


router.post("/users", createUsers);

module.exports= router