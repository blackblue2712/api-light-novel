
const express = require("express");
const router = express.Router();

const { addCategory, getCategories } = require("../controllers/category");
const { requireSignin, requestRelatedUserId, isAdmin } = require("../controllers/user");
const { validateAddCategory } = require("../middlewares/index");

router.post("/create/:userId",requireSignin, isAdmin, validateAddCategory, addCategory);
router.get("/get/all", getCategories);


router.param("userId", requestRelatedUserId);
module.exports = router;