const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const StaffService = sequelize.define('StaffService', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = StaffService;
