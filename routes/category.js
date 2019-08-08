
const express = require("express");
const router = express.Router();

const { addCategory } = require("../controllers/category");
const { requireSignin, requestRelatedUserId, isAdmin } = require("../controllers/user");
const { validateAddCategory } = require("../middlewares/index");

router.post("/create/:userId",requireSignin, isAdmin, validateAddCategory, addCategory);


router.param("userId", requestRelatedUserId);
module.exports = router;