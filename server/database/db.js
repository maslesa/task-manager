const mongoose = require('mongoose');

const connectToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB: ', error);
        process.exit(1);
    }
}

module.exports = connectToDB;