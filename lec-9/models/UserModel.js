const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    useremail: {
        type: String,
        required: true,
    },
    userpassword: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    hobby: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }

})
const u = mongoose.model("user", userSchema);
module.exports = u;