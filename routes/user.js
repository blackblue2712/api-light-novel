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
    postUpdateUser,
    postUpdatePasswordUser
} = require("../controllers/user");
const { validateSignupUser, validateUpdateUser, validatePasswordUser } = require("../middlewares/index");

router.get("/get/all", getUsers);
router.post("/get/more", getMoreUsers);
router.post("/signup", validateSignupUser, postSignup);
router.post("/signin", postSignin);
router.post("/signout", postSignout);

// Update
router.post("/update", postUpdateUser);
router.post("/update-password/:userId", validatePasswordUser, postUpdatePasswordUser);

// Single
router.get("/get/:userId", getSingleUser);

router.param("userId", requestRelatedUserId)

module.exports = router;