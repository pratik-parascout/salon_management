const { Service } = require('../models');
const serviceService = require('../services/serviceService');

exports.createService = async (req, res) => {
  try {
    const { name, description, duration, price } = req.body;
    const service = await Service.create({
      name,
      description,
      duration,
      price,
    });
    res.status(201).json({ message: 'Service created successfully', service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const { name, description, duration, price } = req.body;
    await Service.update(
      { name, description, duration, price },
      { where: { id: serviceId } }
    );
    res.json({ message: 'Service updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    await Service.destroy({ where: { id: serviceId } });
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.setServiceAvailability = async (req, res) => {
  try {
    const { serviceId, availableSlots } = req.body;
    await Service.update({ availableSlots }, { where: { id: serviceId } });
    res.json({ message: 'Service availability updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const { serviceId, date } = req.query;
    if (!serviceId || !date)
      return res
        .status(400)
        .json({ message: 'serviceId and date are required' });
    const remainingSlots = await serviceService.getAvailableSlots(
      serviceId,
      date
    );
    res.json({ availableSlots: remainingSlots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
