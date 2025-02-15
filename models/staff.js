const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Staff = sequelize.define('Staff', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: DataTypes.STRING,
  availability: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

module.exports = Staff;
