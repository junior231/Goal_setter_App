const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register new User
// @routes POST /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {
    // destructure body data from req
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        // if all required fields are not available
        // throw bad request errror
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if user exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already Exists')
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

// @desc Authenticate a User
// @routes POST /api/users/login
// @access Public
const loginUser = asyncHandler(async(req, res) => {
    // destructure body data from req
    const {email, password} = req.body

    // search for user by email since it is unique
    const user = await User.findOne({email})

    // check for the password and match with email 
    // since password is hashed in database, use bcrypt to compare the entered plain text(user.password) with hashed value (password)
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Login Credentials')
    }
})

// @desc Get User data
// @routes GET /api/users/me
// @access Private
const getMe = asyncHandler(async(req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}