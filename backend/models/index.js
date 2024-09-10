const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Product = require('./productModel');
const ProductImage = require('./productImageModel');
const ProductCategory = require('./productCategoryModel');
const Category = require('./categoryModel');
const CategoryDetail = require('./categoryDetailModel');
const Image = require('./imageModel');
const User = require('./userModel');
const Customer = require('./customerModel');
const Wishlist = require('./wishlistModel');

// Export models
module.exports = {
    Product,
    ProductImage,
    ProductCategory,
    Category,
    CategoryDetail,
    Image,
    User,
    Customer,
    Wishlist,
    sequelize
};
