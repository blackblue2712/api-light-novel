const express = require("express");
const router = express.Router();

const {
    postSignup,
    postSignin,
    postSignout,
    getUsers,
    getMoreUsers,
    requestRelatedUserId,
    getSingleUser,
    postUpdateUser
} = require("../controllers/user");
const { validateSignupUser, validateUpdateUser } = require("../middlewares/index");

router.get("/get/all", getUsers);
router.post("/get/more", getMoreUsers);
router.post("/signup", validateSignupUser, postSignup);
router.post("/signin", postSignin);
router.post("/signout", postSignout);

// Update
router.post("/update", validateUpdateUser, postUpdateUser);

// Single
router.get("/get/:userId", getSingleUser);

router.param("userId", requestRelatedUserId)

module.exports = router;