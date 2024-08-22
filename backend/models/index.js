const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Product = require('./productModel');
const ProductImage = require('./productImageModel');
const ProductCategory = require('./productCategoryModel');
const Category = require('./categoryModel');
const CategoryDetail = require('./categoryDetailModel');
const Image = require('./imageModel');

// Export models
module.exports = {
    Product,
    ProductImage,
    ProductCategory,
    Category,
    CategoryDetail,
    Image,
    sequelize
};
