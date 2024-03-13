const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Succesfully connected to DB');
    } catch (err) {
        console.log('An error occurred while connecting to DB: '+ err);
    }
}

module.exports = connectDB;