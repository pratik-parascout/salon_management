const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  duration: DataTypes.INTEGER,
  price: DataTypes.DECIMAL(10, 2),
  availableSlots: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

module.exports = Service;
