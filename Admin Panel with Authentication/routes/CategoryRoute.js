const express = require('express');
const { viewCategoryPage, addCategoryPage, insertCategory, deleteCategory, changeStatus, editCategory, updateCategory } = require('../controllers/CategoryController');

const routes = express.Router();

routes.get('/',viewCategoryPage);
routes.get('/addcategorypage',addCategoryPage);
routes.post('/insertcategory',insertCategory);

routes.get('/deletecategory',deleteCategory);

routes.get('/editcategory',editCategory);
routes.post('/updatecategory',updateCategory);

routes.get('/changestatus',changeStatus);

module.exports = routes;