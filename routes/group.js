
const express = require("express");
const router = express.Router();

const {
    createGroupUser,
    getGroups,
    getMoreGroups,
    getSingleGroup,
    postUpdateGroup,
    requestRelatedGroupId
} = require("../controllers/group");
const { validateCreateGroupUser } = require("../middlewares/index"); 
const { requireSignin } = require("../controllers/user")

router.get("/get/all", getGroups);
router.post("/get/more", getMoreGroups);
router.post("/create", validateCreateGroupUser, createGroupUser);

// Single group
router.get("/get/:groupId", getSingleGroup);

router.post("/update", validateCreateGroupUser, postUpdateGroup);

router.param("groupId", requestRelatedGroupId);

module.exports = router;