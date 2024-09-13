const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Image = sequelize.define('Image', {
    imageid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    cdnid: {
        type: DataTypes.UUID,
        allowNull: false,        
    },
    imagepath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagetype: {
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
    properties: {
        type: DataTypes.JSONB,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'image',
    tableName: 'images',
    timestamps: false,
});

module.exports = Image;
