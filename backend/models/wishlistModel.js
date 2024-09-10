const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Customer = require('./customerModel');
const Product = require('./productModel');

const Wishlist = sequelize.define('Wishlist', {
    wishlistid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    customerid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Customer,
            key: 'customerid'
        },
        onDelete: 'CASCADE'
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
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createddate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'wishlists',
    timestamps: false
});

Customer.hasMany(Wishlist, { foreignKey: 'customerid', onDelete: 'CASCADE' });
Wishlist.belongsTo(Customer, { foreignKey: 'customerid', onDelete: 'CASCADE' });

Product.hasMany(Wishlist, { foreignKey: 'productid', onDelete: 'CASCADE' });
Wishlist.belongsTo(Product, { foreignKey: 'productid', onDelete: 'CASCADE' });

module.exports = Wishlist;
