const subCategoryModel = require('../models/subCategoryModel');
const categoryModel = require('../models/categoryModel');
const extraSubCategoryModel = require('../models/extraSubCategoryModel');

const addExtraSubCategoryPage = async (req,res) => {
    try{
        let category = await categoryModel.find({ status: 'active' });
        let subcategory = await subCategoryModel.find({ status: 'active' });

        return res.render('extrasubcategory/addExtraSubCategory',{
            category:category,
            subcategory:subcategory
        });
    }catch(err){
        console.log(err);
        return false;
    }
}

const viewExtraSubCategoryPage = async (req,res) => {
    try{
        let extraSubCategory = await extraSubCategoryModel.find({}).populate('categoryId').populate('subcategoryId')
        return res.render('extrasubcategory/viewExtraSubCategory',{
            extraSubCategory 
        });
    }catch(err){
        console.log(err);
        return false;
    }
}

const insertExtraSubCategory = async (req,res) => {
    try{
        const { category, subcategory, extrasubcategory } = req.body;
        await extraSubCategoryModel.create({
            categoryId: category,
            subcategoryId: subcategory,
            extraSubCategory: extrasubcategory
        })
        req.flash('success', "ExtraSubCategory Successfully Added..! ( You can view it on ViewExtraSubCategory Page..! )");
        return res.redirect('/extrasubcategory/addextrasubcategorypage');
    }catch(err){
        console.log(err);
        return false;
    }
}

const deleteExtraSubCategory = async (req,res) => {
    try{
        let delId = req.query.delId;
        await extraSubCategoryModel.findByIdAndDelete(delId);
        req.flash('success',"ExtraSubCategory Successfully Deleted..! ");
        return res.redirect('/extrasubcategory');
    }catch(err){
        console.log(err);
        return false;
    }
}
const editExtraSubCategory = async (req,res) => {
    try {
        let editId = req.query.editId;
        let allCategories = await categoryModel.find({ status: 'active' });
        let oneRowRecord = await extraSubCategoryModel.findById(editId).populate('categoryId').populate('subcategoryId');
        return res.render('extrasubcategory/editExtraSubCategory', {
            allCategories: allCategories,
            oneRowRecord: oneRowRecord,
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}

const ajaxCategoryWiseRecords = async (req,res) => {
    try{
        let categoryId = req.query.categoryId;
        

        let subCategoryData = await subCategoryModel.find({ categoryId: categoryId, status: 'active' }).populate('categoryId');
        return res.status(200).send({
            success: true,
            message: "Record Successfully Fetched..!",
            subcategory: subCategoryData
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

const changeStatus = async (req,res) => {
    try{
        try {
            const { stId, status } = req.query;
            if (status === "active") {
                await extraSubCategoryModel.findByIdAndUpdate(stId, { status: 'active' })
            } else {
                await extraSubCategoryModel.findByIdAndUpdate(stId, { status: 'deactive' })
            }
            req.flash("success", "ExtraSubCategory Status Successfully Changed..!");
            return res.redirect('/extrasubcategory');
        } catch (err) {
            console.log(err);
            return false
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    addExtraSubCategoryPage,
    viewExtraSubCategoryPage,
    insertExtraSubCategory,
    deleteExtraSubCategory,
    editExtraSubCategory,
    ajaxCategoryWiseRecords,
    changeStatus
}