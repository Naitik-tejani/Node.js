const mongoose = require('mongoose');

const detailSchema = mongoose.Schema({
    bookName : {
        type : String,
        required : true
    },
    bookPrice : {
        type : String,
        required : true
    },
    bookPages : {
        type : String,
        required : true
    },
    bookDescription : {
        type : String,
        required : true
    },
    bookAuthor : {
        type : String,
        required : true
    }
})

const bookDetails = mongoose.model("book", detailSchema);
module.exports = bookDetails;