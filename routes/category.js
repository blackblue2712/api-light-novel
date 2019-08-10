
const express = require("express");
const router = express.Router();

const { addCategory, getCategories, getMoreCategories, getAllCategories } = require("../controllers/category");
const { requireSignin, requestRelatedUserId, isAdmin } = require("../controllers/user");
const { validateAddCategory } = require("../middlewares/index");

router.post("/create/:userId",requireSignin, isAdmin, validateAddCategory, addCategory);
router.get("/get/five", getCategories);
router.get("/get/all", getAllCategories);
router.post("/get/more", getMoreCategories);


router.param("userId", requestRelatedUserId);
module.exports = router;