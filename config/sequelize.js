// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('salon_booking', 'root', 'root', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false, // disable logging
// });

// module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // RDS username
  process.env.DB_PASSWORD, // RDS password
  {
    host: process.env.DB_HOST, // RDS endpoint
    port: process.env.DB_PORT, // Typically 3306
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;
