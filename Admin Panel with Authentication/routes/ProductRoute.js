const express = require('express');
const { viewProductsPage, addProductsPage, ajaxSubcategorywiseRecord } = require('../controllers/ProductController');

const routes = express.Router();

routes.get('/',viewProductsPage);
routes.get('/addproductspage',addProductsPage);


routes.get('/ajaxsubcategorywiserecord', ajaxSubcategorywiseRecord)

module.exports = routes;