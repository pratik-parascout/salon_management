const { Service, Appointment } = require('../models');

async function getAvailableSlots(serviceId, date) {
  const service = await Service.findByPk(serviceId);
  if (!service) throw new Error('Service not found');
  const availableSlots = service.availableSlots || [];
  const appointments = await Appointment.findAll({
    where: { serviceId, date },
    attributes: ['time'],
  });
  const bookedSlots = appointments.map((appt) => appt.time);
  return availableSlots.filter((slot) => !bookedSlots.includes(slot));
}

module.exports = { getAvailableSlots };
