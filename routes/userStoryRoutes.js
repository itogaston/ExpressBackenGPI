const express = require("express");
const router = express.Router();

const {
    getUserStories,
    setUserStory,
    updateUserStory,
    deleteUserStory
} = require("../controllers/userStoryController");

const { protect } = require('../middleware/authMiddleware')

// Router for /api/sprints

router.get("/:id", protect, getUserStories);
router.post("/", protect, setUserStory);
router.put("/", protect, updateUserStory);
router.delete("/", protect, deleteUserStory);

module.exports = router