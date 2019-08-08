const express = require("express");
const router = express.Router();

const { addChapter } = require("../controllers/chpater");
const { requireSignin, requestRelatedUserId, isAdmin } = require("../controllers/user");
const { validateAddChapter } = require("../middlewares/index");

router.post("/create/:userId",requireSignin, isAdmin, validateAddChapter, addChapter);


router.param("userId", requestRelatedUserId);
module.exports = router;