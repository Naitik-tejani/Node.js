const mongoose = require('mongoose');

const extraSubCategorySchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    },
    extraSubCategory: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "active"
    }
})

const extraSubCategory = mongoose.model('extraSubCategory', extraSubCategorySchema);
module.exports = extraSubCategory;