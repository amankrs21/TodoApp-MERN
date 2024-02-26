const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mern');
        console.log('MongoDB connected');
    }
    catch (error) {
        console.log('MongoDB connection failed', error);
    }
}

module.exports = connect;
