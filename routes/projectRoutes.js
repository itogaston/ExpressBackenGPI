const express = require("express");
const router = express.Router();

const {
    getProjects,
    setProject,
    updateProject,
    deleteProject,
    getProjectById
} = require("../controllers/projectController");

const { protect } = require('../middleware/authMiddleware')

// Router for /api/projects

router.get("/", protect, getProjects);
router.post("/", protect, setProject);
router.put("/", protect, updateProject);
router.delete("/", protect, deleteProject);

router.get("/:id", protect, getProjectById)

module.exports = router