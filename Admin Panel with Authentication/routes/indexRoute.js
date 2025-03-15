const express = require('express');

const routes = express.Router();

routes.use('/',require('./AuthRoute'));
routes.use('/category',require('./CategoryRoute'));
routes.use('/subcategory',require('./SubCategoryRoute'));
routes.use('/extrasubcategory',require('./ExtraSubCategoryRoute'));
routes.use('/products',require('./ProductRoute'))

module.exports = routes;