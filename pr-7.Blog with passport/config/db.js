const mongoose = require('mongoose');
const connectDB = async() => {
    try {
        let db = mongoose.connect('mongodb://127.0.0.1/p-7-blog');
        console.log('MongoDB Connected...');
    }catch(err){
        console.error(err);
        return false;
    }
}

module.exports = connectDB;