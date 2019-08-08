
const express = require("express");
const router = express.Router();

const { addBook } = require("../controllers/book");
const { requireSignin, requestRelatedUserId, isAdmin } = require("../controllers/user");
const { validateAddBook } = require("../middlewares/index");

router.post("/create/:userId",requireSignin, isAdmin, validateAddBook, addBook);


router.param("userId", requestRelatedUserId);
module.exports = router;