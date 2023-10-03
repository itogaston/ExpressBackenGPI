const express = require("express");
const router = express.Router();

const {
    loginUser,
    registerUser,
    getMe,
    deleteUser
} = require("../controllers/userController");

const {protect} = require('../middleware/authMiddleware');

// Router for /api/users

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.delete("/me",protect, deleteUser);

module.exports = router