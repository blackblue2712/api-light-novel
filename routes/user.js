const express = require("express");
const router = express.Router();

const { postSignup, postSignin, postSignout } = require("../controllers/user");
const { validateSignupUser } = require("../middlewares/index");

router.post("/signup", validateSignupUser, postSignup);
router.post("/signin", postSignin);
router.post("/signout", postSignout);

module.exports = router;