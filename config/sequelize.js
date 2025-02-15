const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('salon_booking', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // disable logging
});

module.exports = sequelize;
