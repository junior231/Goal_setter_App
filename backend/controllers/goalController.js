// use express async handler package 
const asyncHandler = require('express-async-handler')

//bring in our model
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc Get goals
// @routes GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    // get specific user goal instead of grabbing all goals
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

// @desc Set goals
// @routes POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
     // check if request body has text
    if (!req.body.text) {
        // if not show client error
        res.status(400)

        // use express error handler
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})


// @desc Update goals
// @routes PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // allow users to only update their goals
    const user = await User.findById(req.user.id)

    // check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    

    // make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal)
})


// @desc Delete goals
// @routes DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    // check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    

    // make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

   await goal.remove()

    res.status(200).json({id: req.params.id})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}