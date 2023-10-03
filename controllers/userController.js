const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Authenticate a user
// @route   POST api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400)
        throw new Error("Missing data")
    }

    const user = await User.findOne({ email: email });

    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }
    else {
        res.status(400)
        throw new Error("User or password invalid")
    }
})

// @desc    Create new user
// @route   POST api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Missing data")
    }

    userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error("User already exist");
    }
    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400);
        throw new Error("Unable to create user");
    }
})

// @desc    Get user data
// @route   GET api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    if (!req.user || !req.user.id) {
        res.status(400);
        throw new Error("Error reading data from user");
    }
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// @desc    Delete user
// @route   DELETE api/users/me
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    if (!req.user || !req.user.id) {
        res.status(400);
        throw new Error("Error reading data from user");
    }
    const { _id } = await User.findByIdAndDelete(req.user.id);

    res.status(200).json({
        id: _id,
    })
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

module.exports = {
    loginUser,
    registerUser,
    getMe,
    deleteUser
};
