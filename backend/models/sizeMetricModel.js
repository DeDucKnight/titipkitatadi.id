const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class SizeMetric extends Model {}

SizeMetric.init({
    sizemetricid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    sizemetricname: {
        type: DataTypes.STRING(255),
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
    sequelize,
    tableName: 'sizemetrics',
    timestamps: false,
});

module.exports = SizeMetric;