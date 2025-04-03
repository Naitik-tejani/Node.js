const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/pr-9-Blog');

const db = mongoose.connection;

db.on("connected", (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log('database successfully connected');
})

module.exports = db;
