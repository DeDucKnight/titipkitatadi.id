const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    productid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    productname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    discountprice: {
        type: DataTypes.DECIMAL(10, 2),
    },
    brand: {
        type: DataTypes.STRING,
    },
    colors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    sizes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    material: {
        type: DataTypes.STRING,
    },
    onlinestores: {
        type: DataTypes.JSONB,
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    createddate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
    tableName: 'products',
});

module.exports = Product;