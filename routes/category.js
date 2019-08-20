
const express = require("express");
const router = express.Router();

const { 
    addCategory,
    getCategories,
    getMoreCategories,
    getAllCategories,
    postUpdateCategory,
    deleteCategory,
    requestRelatedCategoryId,
    getSingleCategory
} = require("../controllers/category");
const { requireSignin, requestRelatedUserId, isAdmin } = require("../controllers/user");
const { validateAddCategory } = require("../middlewares/index");

router.post("/create/:userId", requireSignin, isAdmin, validateAddCategory, addCategory);
router.get("/get/five", getCategories);
router.get("/get/all", getAllCategories);
router.post("/get/more", getMoreCategories);
router.get("/get/:cateId", getSingleCategory);

// Update
router.post("/update/:cateId", requireSignin, validateAddCategory, postUpdateCategory);

// Delete
router.delete("/delete/:cateId", requireSignin, deleteCategory);

// Parameters
router.param("userId", requestRelatedUserId);
router.param("cateId", requestRelatedCategoryId);
module.exports = router;