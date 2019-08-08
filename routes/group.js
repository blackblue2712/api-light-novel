
const express = require("express");
const router = express.Router();

const { createGroupUser } = require("../controllers/group");
const { validateCreateGroupUser } = require("../middlewares/index"); 
const { requireSignin } = require("../controllers/user")

router.post("/create", validateCreateGroupUser, createGroupUser);

module.exports = router;