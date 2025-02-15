const { Staff, Service } = require('../models');

exports.createStaff = async (req, res) => {
  try {
    const { name, specialization, availability } = req.body;
    const staff = await Staff.create({ name, specialization, availability });
    res
      .status(201)
      .json({ message: 'Staff profile created successfully', staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getStaff = async (req, res) => {
  try {
    const staff = await Staff.findAll();
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateStaff = async (req, res) => {
  try {
    const staffId = req.params.id;
    const { name, specialization, availability } = req.body;
    await Staff.update(
      { name, specialization, availability },
      { where: { id: staffId } }
    );
    res.json({ message: 'Staff profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.assignService = async (req, res) => {
  try {
    const staffId = req.params.id;
    const { serviceId } = req.body;
    const staff = await Staff.findByPk(staffId);
    const service = await Service.findByPk(serviceId);
    if (!staff || !service)
      return res.status(404).json({ message: 'Staff or Service not found' });

    // Optional: Check if staff specialization matches service name (simple check)
    if (
      staff.specialization &&
      !staff.specialization.toLowerCase().includes(service.name.toLowerCase())
    ) {
      return res.status(400).json({
        message: 'Staff specialization does not match service required.',
      });
    }

    // Optional: Check if there is an overlap in availability between staff and service.
    if (staff.availability && service.availableSlots) {
      const staffAvail = Array.isArray(staff.availability)
        ? staff.availability
        : [];
      const serviceAvail = Array.isArray(service.availableSlots)
        ? service.availableSlots
        : [];
      const intersection = staffAvail.filter((day) =>
        serviceAvail.includes(day)
      );
      if (intersection.length === 0) {
        return res.status(400).json({
          message: 'No overlapping availability between staff and service.',
        });
      }
    }

    // Use Sequelize's automatically generated method for many-to-many association
    await staff.addService(service);
    res.json({ message: 'Service assigned to staff successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
