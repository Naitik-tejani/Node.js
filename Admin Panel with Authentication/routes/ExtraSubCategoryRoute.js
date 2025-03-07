const express = require('express');
const { addExtraSubCategoryPage, viewExtraSubCategoryPage, insertExtraSubCategory, deleteExtraSubCategory, editExtraSubCategory, ajaxCategoryWiseRecords, changeStatus } = require('../controllers/ExtraSubCategoryController');

const routes = express.Router();

routes.get('/',viewExtraSubCategoryPage);
routes.get('/addextrasubcategorypage',addExtraSubCategoryPage);
routes.post('/insertextrasubcategory',insertExtraSubCategory);

routes.get('/deleteextrasubcategory',deleteExtraSubCategory);
routes.get('/editextrasubcategory',editExtraSubCategory);
routes.get('/ajaxcategorywiserecords',ajaxCategoryWiseRecords);

routes.get('/changestatus',changeStatus);

module.exports = routes;