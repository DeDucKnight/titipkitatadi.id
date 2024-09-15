const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const SizeMetric = require('./sizeMetricModel');

class SizeAttribute extends Model {}

SizeAttribute.init({
    sizeattributeid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    sizemetricid: {
        type: DataTypes.UUID,
        references: {
            model: SizeMetric,
            key: 'sizemetricid',
        },
        onDelete: 'CASCADE',
        allowNull: false,
    },
    sizeattributename: {
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
    tableName: 'sizeattributes',
    timestamps: false,
});

SizeMetric.hasMany(SizeAttribute, {
    foreignKey: 'sizemetricid'
});
SizeAttribute.belongsTo(SizeMetric, {
    foreignKey: 'sizemetricid'
});

module.exports = SizeAttribute;