const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @route POST verify
// @access Private
const verifyToken = asyncHandler(async (req, res) => {
  
  const user = req.user;
  if (!user) {
    res.status(400).json(null);
  }
  
  res.status(200).json({token: req.headers.authorization.split(" ")[1]});
});


module.exports = {
  verifyToken
};
