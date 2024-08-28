const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./productModel');
const CategoryDetail = require('./categoryDetailModel');

const ProductCategory = sequelize.define('ProductCategory', {
    productcategoryid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    productid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Product,
            key: 'productid'
        },
        onDelete: 'CASCADE'
    },
    categorydetailid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: CategoryDetail,
            key: 'categorydetailid'
        },
        onDelete: 'CASCADE'
    },
}, {
    timestamps: false,
    tableName: 'productcategories',
});

// Establish associations
Product.hasMany(ProductCategory, { foreignKey: 'productid' });
ProductCategory.belongsTo(Product, { foreignKey: 'productid' });

CategoryDetail.hasMany(ProductCategory, { foreignKey: 'categorydetailid' });
ProductCategory.belongsTo(CategoryDetail, { foreignKey: 'categorydetailid' });

Product.belongsToMany(CategoryDetail, { through: ProductCategory, foreignKey: 'productid' });
CategoryDetail.belongsToMany(Product, { through: ProductCategory, foreignKey: 'categorydetailid' });

module.exports = ProductCategory;
