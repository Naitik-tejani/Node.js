const subCategoryModel = require('../models/subCategoryModel');
const categoryModel = require('../models/categoryModel');

const addSubCategoryPage = async (req,res) =>{
    try{
        let categories = await categoryModel.find({ status: 'active' });

        return res.render('subcategory/addSubCategory',{
            categories: categories
        });
    }catch(err){
        console.log(err);
        return false;
    }
}

const viewSubCategoryPage = async (req,res) => {
    try{
        let subcategorydata = await subCategoryModel.find({}).populate('categoryId');
        return res.render('subcategory/viewSubCategory', {
            subcategorydata
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

const insertSubCategory = async (req,res) => {
    try{
        const { category, subcategory } = req.body;

        await subCategoryModel.create({
            categoryId: category,
            subcategory: subcategory
        })
        req.flash('success', 'SubCategory Successfully Added..! ( You can view it on ViewSubCategory Page..! )')
        return res.redirect("/subcategory/addsubcategorypage");
    }catch(err){
        console.log(err);
        return false;
    }
}

const deleteSubCategory = async (req,res) => {
    try{
        let DelId = req.query.delId;
        await subCategoryModel.findByIdAndDelete(DelId);
        
        console.log("SubCategory Successfully Deleted..!");
        req.flash('success', 'SubCategory Successfully Deleted..! ( You can view it at below.. )')
        return res.redirect('/subcategory');
    }catch(err){
        console.log(err);
        return false;
    }
}

const editSubCategory = async (req,res) => {
    try{
        let editId = req.query.editId;
        let oneRowRecord = await subCategoryModel.findById(editId).populate('categoryId');
        let category = await categoryModel.find({ status: 'active' });
        return res.render('subcategory/editSubCategory',{
            oneRowRecord,
            category
        });
    }catch(err){
        console.log(err);
        return false;
    }
}

const updateSubCategory = async (req,res) => {
    try{
        let { editId, category, subcategory } = req.body;
        await subCategoryModel.findByIdAndUpdate(editId, {
            categoryId: category,
            subcategory: subcategory
        })
        req.flash("success", "SubCategory Successfully Updated..!");
        return res.redirect('/subcategory');

    }catch(err){
        console.log(err);
        return false;
    }
}

const changeStatus = async (req, res) => {
    try {
        const { stId, status } = req.query;

        if (status === "active") {
            await subCategoryModel.findByIdAndUpdate(stId, { status: 'active' })
        } else {
            await subCategoryModel.findByIdAndUpdate(stId, { status: 'deactive' })
        }

        req.flash("success", "SubCategory Status Successfully Changed..!");
        return res.redirect('/subcategory');
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    addSubCategoryPage,
    viewSubCategoryPage,
    insertSubCategory,
    deleteSubCategory,
    editSubCategory,
    updateSubCategory,
    changeStatus
}