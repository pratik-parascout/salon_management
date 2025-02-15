const { Staff, Service, sequelize } = require('../models');

async function assignServiceToStaff(staffId, serviceId) {
  const transaction = await sequelize.transaction();
  try {
    const staff = await Staff.findByPk(staffId, { transaction });
    const service = await Service.findByPk(serviceId, { transaction });
    if (!staff || !service) {
      throw new Error('Staff or Service not found');
    }
    await staff.addService(service, { transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports = { assignServiceToStaff };
