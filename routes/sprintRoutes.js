const express = require("express");
const router = express.Router();

const {
    getSprints,
    setSprint,
    updateSprint,
    deleteSprint
} = require("../controllers/sprintController");

const { protect } = require('../middleware/authMiddleware')

// Router for /api/sprints

router.get("/:id", protect, getSprints);
router.post("/", protect, setSprint);
router.put("/", protect, updateSprint);
router.delete("/", protect, deleteSprint);

module.exports = router