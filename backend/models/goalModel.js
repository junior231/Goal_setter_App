const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    // associate each created goal with a user by adding a user field to our goal schema
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
    type: String,
    required: [true, 'Please add a text value']
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Goal', goalSchema)