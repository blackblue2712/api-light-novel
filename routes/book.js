
const express = require("express");
const router = express.Router();

const {
    addBook,
    getBooks,
    getSingleBook,
    requestRelatedBookId,
    getMoreBooks,
    postUpdateBook,
    deleteBook
} = require("../controllers/book");
const { requireSignin, requestRelatedUserId, isAdmin } = require("../controllers/user");
const { validateAddBook } = require("../middlewares/index");

router.post("/create/:userId",requireSignin, isAdmin, validateAddBook, addBook);
router.get("/get/all", getBooks);
router.post("/get/more", getMoreBooks);
router.get("/:bookId", getSingleBook);

// Update
router.post("/update/:bookId", postUpdateBook);
router.delete("/delete/:bookId", deleteBook);

router.param("userId", requestRelatedUserId);
router.param("bookId", requestRelatedBookId);
module.exports = router;