const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    role: {
        type: String,
        lowercase: true,
        default: "Subscripte"
    },
    image_path: {
        type: String,
    },
    image_name: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
    status_toggle: {
        type: Number,
        default: 1
    },
    is_ban: {
        type: Number,
        default: 1
    },
    bio: {
        type: String,
    },
    adress: {
        type: String,
    },
    city: {
        type: String,
    },
    street: {
        type: String,
    }
})

module.exports = mongoose.model('user', UserSchema) 