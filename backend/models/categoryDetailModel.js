const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./categoryModel');

const CategoryDetail = sequelize.define('CategoryDetail', {
    categorydetailid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    categoryid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Category,
            key: 'categoryid'
        },
        onDelete: 'CASCADE'
    },
    categorydetailname: {
        type: DataTypes.STRING,
        allowNull: false,
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
    tableName: 'categorydetails',
});

// Establish associations
Category.hasMany(CategoryDetail, { foreignKey: 'categoryid' });
CategoryDetail.belongsTo(Category, { foreignKey: 'categoryid' });

module.exports = CategoryDetail;
