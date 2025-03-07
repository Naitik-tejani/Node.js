const express = require('express');
const { addSubCategoryPage, viewSubCategoryPage, insertSubCategory, deleteSubCategory, editSubCategory, updateSubCategory, changeStatus } = require('../controllers/SubCategoryController');

const routes = express.Router();

routes.get('/',viewSubCategoryPage);
routes.get('/addsubcategorypage',addSubCategoryPage);
routes.post('/insertsubcategory',insertSubCategory);

routes.get('/deletesubcategory',deleteSubCategory);
routes.get('/editsubcategory',editSubCategory);
routes.post('/updatesubcategory',updateSubCategory);

routes.get('/changestatus',changeStatus);

module.exports = routes;