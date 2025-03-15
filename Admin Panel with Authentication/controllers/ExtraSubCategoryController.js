const subCategoryModel = require('../models/subCategoryModel');
const categoryModel = require('../models/categoryModel');
const extraSubCategoryModel = require('../models/extraSubCategoryModel');

const addExtraSubCategoryPage = async (req, res) => {
    try {
        let category = await categoryModel.find({ status: 'active' });
        let subcategory = await subCategoryModel.find({ status: 'active' });

        return res.render('extrasubcategory/addExtraSubCategory', {
            category: category,
            subcategory: subcategory
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}

const viewExtraSubCategoryPage = async (req, res) => {
    try {
        let extraSubCategory = await extraSubCategoryModel.find({}).populate('categoryId').populate('subcategoryId')
        return res.render('extrasubcategory/viewExtraSubCategory', {
            extraSubCategory
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}

const insertExtraSubCategory = async (req, res) => {
    try {
        const { editId, category, subcategory, extrasubcategory } = req.body;

        if (editId) {
            await extraSubCategoryModel.findByIdAndUpdate(editId, {
                categoryId: category,
                subcategoryId: subcategory,
                extraSubCategory: extrasubcategory
            })
            req.flash('success', 'ExtraSubCategory Successfully Updated..!');
            return res.redirect('/extrasubcategory');
        } else {
            await extraSubCategoryModel.create({
                categoryId: category,
                subcategoryId: subcategory,
                extraSubCategory: extrasubcategory
            })
            req.flash('success', "ExtraSubCategory Successfully Added..! ( You can view it on ViewExtraSubCategory Page..! )");
            return res.redirect('/extrasubcategory/addextrasubcategorypage');
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const deleteExtraSubCategory = async (req, res) => {
    try {
        let delId = req.query.delId;
        await extraSubCategoryModel.findByIdAndDelete(delId);
        req.flash('success', "ExtraSubCategory Successfully Deleted..! ");
        return res.redirect('/extrasubcategory');
    } catch (err) {
        console.log(err);
        return false;
    }
}
const editExtraSubCategory = async (req, res) => {
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

const ajaxCategoryWiseRecords = async (req, res) => {

    let categoryid = req.query.categoryid;
    // console.log(categoryid);
    
    try {
        let category = await subCategoryModel.find({ categoryId: categoryid }).populate('categoryId');
        let subcategories = await subCategoryModel.find({ categoryId: categoryid, status: 'active' });

        // console.log(category, subcategories);
        
        return res.status(200).json({
            success: true,
            message: "Records Successfully Fetched..!",
            category: category,
            subcategories: subcategories
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Something went wrong!" });
    }

}

const changeStatus = async (req, res) => {
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
