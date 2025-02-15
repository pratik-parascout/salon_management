const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'booked',
  },
  paymentInfo: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

module.exports = Appointment;
