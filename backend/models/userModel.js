const mongoose = require('mongoose')

// fields we want our users to have
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        // make email unique
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
},{
    // add timeStamps
    timestamps: true  
})

module.exports = mongoose.model('User', userSchema)