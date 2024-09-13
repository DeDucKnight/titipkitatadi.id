const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./productModel');
const SizeAttribute = require('./sizeAttributeModel');

class ProductSizeMetric extends Model {}

ProductSizeMetric.init({
    productsizemetricid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    productid: {
        type: DataTypes.UUID,
        references: {
            model: Product,
            key: 'productid',
        },
        onDelete: 'CASCADE',
        allowNull: false,
    },
    sizeattributeid: {
        type: DataTypes.UUID,
        references: {
            model: SizeAttribute,
            key: 'sizeattributeid',
        },
        onDelete: 'CASCADE',
        allowNull: false,
    },
    measurements: {
        type: DataTypes.JSONB,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'productsizemetric',
    tableName: 'productsizemetrics',
    timestamps: false,
});

Product.hasMany(ProductSizeMetric, {
    foreignKey: 'productid'
});
ProductSizeMetric.belongsTo(Product, {
    foreignKey: 'productid'
});

SizeAttribute.hasMany(ProductSizeMetric, {
    foreignKey: 'sizeattributeid'
});
ProductSizeMetric.belongsTo(SizeAttribute, {
    foreignKey: 'sizeattributeid'
});

module.exports = ProductSizeMetric;