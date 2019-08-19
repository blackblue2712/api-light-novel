const express = require("express");
const router = express.Router();

const {
    addChapter,
    requestRelatedBookIdToGetChapters,
    getChapters,
    getSingleChapter,
    requestRelatedChapterId,
    deleteChapter
} = require("../controllers/chapter");
const { crawlChapter, getContentFromCrawlLink } = require("../controllers/crawl");
const { requireSignin, requestRelatedUserId, isAdmin } = require("../controllers/user");
// const { validateAddChapter } = require("../middlewares/index");

router.post("/create/crawl-links", crawlChapter);
router.post("/create/crawl-data", getContentFromCrawlLink);
router.post("/create/:userId", requireSignin, isAdmin, addChapter);
router.delete("/delete/:chapterId", requireSignin, deleteChapter);

router.get("/get/:bookId", getChapters);
router.get("/:chapterId", getSingleChapter);

router.param("userId", requestRelatedUserId);
router.param("bookId", requestRelatedBookIdToGetChapters);
router.param("chapterId", requestRelatedChapterId);
module.exports = router;
