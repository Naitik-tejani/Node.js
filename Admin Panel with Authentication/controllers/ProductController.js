const subCategoryModel = require('../models/subCategoryModel');
const categoryModel = require('../models/categoryModel');
const extraSubCategoryModel = require('../models/extraSubCategoryModel');

const addProductsPage = async (req,res) => {
    try {
        return res.render('products/addProducts', {
            category: await categoryModel.find({ status: 'active' }),
            subcategory: await subCategoryModel.find({}).populate("categoryId")
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}

const viewProductsPage = (req,res) => {
    return res.render('products/viewProducts',{
        exsubcategory: []
    });
}

const ajaxSubcategorywiseRecord = async (req,res) => {
    try {
        let subcategoryid = req.query.subcategoryId;
        let exsubcat = await extraSubCategoryModel.find({ subcategoryId: subcategoryid }).populate('categoryId').populate('subcategoryId');
        return res.status(200).send({
            success: true,
            message: 'Record Successfully Fetched',
            exsubcategory: exsubcat
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    addProductsPage,
    viewProductsPage,
    ajaxSubcategorywiseRecord
}