const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./productModel')

const ProductRecommendation = sequelize.define('ProductRecommendation', {
    productrecommendationid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    productid: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    recommendedproductid: {
        type: DataTypes.UUID,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'productrecommendations',
    timestamps: false,
});

// Associations
Product.hasMany(ProductRecommendation, {
    foreignKey: 'productid'
});

ProductRecommendation.belongsTo(Product, {
    foreignKey: 'productid',
    as: 'Product',
});
  
ProductRecommendation.belongsTo(Product, {
    foreignKey: 'recommendedproductid',
    as: 'RecommendedProduct',
});
  
Product.belongsToMany(Product, {
    through: ProductRecommendation,
    as: 'RecommendedProducts',
    foreignKey: 'productid',
    otherKey: 'recommendedproductid',
});
  
Product.belongsToMany(Product, {
    through: ProductRecommendation,
    as: 'RecommendedByProducts',
    foreignKey: 'recommendedproductid',
    otherKey: 'productid',
});

module.exports = ProductRecommendation;
