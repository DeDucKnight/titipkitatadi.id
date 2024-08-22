const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./productModel');
const Image = require('./imageModel');

const ProductImage = sequelize.define('ProductImage', {
    productimageid: {
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
    imageid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Image,
            key: 'imageid'
        },
        onDelete: 'CASCADE'
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isdefault: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
    sequelize,
    modelName: 'productimage',
    tableName: 'productimages',
    timestamps: false,
});

// Establish associations
Product.hasMany(ProductImage, { foreignKey: 'productid' });
ProductImage.belongsTo(Product, { foreignKey: 'productid' });

Image.hasMany(ProductImage, { foreignKey: 'imageid' });
ProductImage.belongsTo(Image, { foreignKey: 'imageid' });

module.exports = ProductImage;
