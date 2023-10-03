const express = require("express");
const router = express.Router();

const {
    verifyToken
} = require("../controllers/verifyController");

const {protect} = require('../middleware/authMiddleware');

// Router for /api/verify
router.post("/", protect, verifyToken);

module.exports = router