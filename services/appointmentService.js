const { sequelize, Appointment } = require('../models');

async function createAppointment(appointmentData) {
  const transaction = await sequelize.transaction();
  try {
    const appointment = await Appointment.create(appointmentData, {
      transaction,
    });
    await transaction.commit();
    return appointment;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function rescheduleAppointment(appointmentId, newData) {
  const transaction = await sequelize.transaction();
  try {
    await Appointment.update(newData, {
      where: { id: appointmentId },
      transaction,
    });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function cancelAppointment(appointmentId) {
  const transaction = await sequelize.transaction();
  try {
    await Appointment.update(
      { status: 'cancelled' },
      { where: { id: appointmentId }, transaction }
    );
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports = {
  createAppointment,
  rescheduleAppointment,
  cancelAppointment,
};
