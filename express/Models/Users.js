const mongoose = require("mongoose");

const Users = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
    }
});

module.exports = mongoose.model('Users', Users);
