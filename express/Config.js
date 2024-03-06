const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    }
    catch (error) {
        console.log('MongoDB connection failed', error);
    }
}

module.exports = connect;
