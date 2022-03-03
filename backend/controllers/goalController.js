// use express async handler package 
const asyncHandler = require('express-async-handler')

// @desc Get goals
// @routes GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get Goals'})
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
    res.status(200).json({message: 'Set Goal'})
})


// @desc Update goals
// @routes PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update goal ${req.params.id}`})
})


// @desc Delete goals
// @routes DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete goal ${req.params.id}`})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}