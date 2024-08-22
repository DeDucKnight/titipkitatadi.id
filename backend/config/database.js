require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.SUPABASE_URL, {
    dialect: 'postgres',
    logging: false,  // Disable logging for cleaner output
});

module.exports = sequelize;