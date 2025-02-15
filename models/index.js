const sequelize = require('../config/sequelize');

const User = require('./user');
const Service = require('./service');
const Staff = require('./staff');
const Appointment = require('./appointment');
const Review = require('./review');
const StaffService = require('./staffService');

User.hasMany(Appointment, { foreignKey: 'userId' });
Appointment.belongsTo(User, { foreignKey: 'userId' });

Service.hasMany(Appointment, { foreignKey: 'serviceId' });
Appointment.belongsTo(Service, { foreignKey: 'serviceId' });

Staff.hasMany(Appointment, { foreignKey: 'staffId' });
Appointment.belongsTo(Staff, { foreignKey: 'staffId' });

Staff.belongsToMany(Service, { through: StaffService, foreignKey: 'staffId' });
Service.belongsToMany(Staff, {
  through: StaffService,
  foreignKey: 'serviceId',
});

Appointment.hasOne(Review, { foreignKey: 'appointmentId' });
Review.belongsTo(Appointment, { foreignKey: 'appointmentId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Service,
  Staff,
  Appointment,
  Review,
  StaffService,
};
