const categoryModel = require('../models/categoryModel');

const addCategoryPage = (req,res) => {
    return res.render('category/addCategory');
}

const viewCategoryPage = async (req,res) => {
    try{
        let allCategories = await categoryModel.find({});
        return res.render('category/viewCategory',{
            allCategories : allCategories
        });
    }catch(err){
        console.log(err);
        return false;
    }
}

const insertCategory = async (req,res) => {
    try{
        const { category } = req.body;

        await categoryModel.create({
            category : category
        })
        console.log("Category Successfully Added..!");
        req.flash('success', 'Category Successfully Added..! ( You can view it on ViewCategory Page..! )')
        return res.redirect('/category/addcategorypage');
        
    }catch(err){
        console.log(err);
        return false;
    }
}

const deleteCategory = async (req,res) =>{
    try{
        let DelId = req.query.delId;
        await categoryModel.findByIdAndDelete(DelId);
        
        console.log("Category Successfully Deleted..!");
        req.flash('success', 'Category Successfully Deleted..! ( You can view it at below.. )')
        return res.redirect('/category');
    }catch(err){
        console.log(err);
        return false;
    }
}

const editCategory = async (req,res) => {
    try{
        let editId = req.query?.editId;
        let oneRowRecord =  await categoryModel.findById(editId);
        return res.render('category/editCategory',{
            oneRowRecord
        }) 
    }catch(err){
        console.log(err);
        return false;
    }
}

const updateCategory = async (req,res) => {
    try{
        const { editId, category } = req.body;
        await categoryModel.findByIdAndUpdate(editId, {
            category: category
        })
        req.flash('success', 'Category Details Successfully Updated..!')
        return res.redirect('/category');
    }catch(err){
        console.log(err);
        return false;
    }
}

const changeStatus = async (req, res) => {
    try {
        const { stId, status } = req.query;

        if (status === "active") {
            await categoryModel.findByIdAndUpdate(stId, { status: 'active' })
        } else {
            await categoryModel.findByIdAndUpdate(stId, { status: 'deactive' })
        }
        
        req.flash("success", "Category Status Successfully Changed..!");
        return res.redirect('/category');
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    addCategoryPage,
    viewCategoryPage,
    insertCategory,
    deleteCategory,
    changeStatus,
    editCategory,
    updateCategory,
}