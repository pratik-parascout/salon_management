const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get(
  '/customers',
  authMiddleware,
  adminMiddleware,
  adminController.getCustomers
);
router.get(
  '/appointments',
  authMiddleware,
  adminMiddleware,
  adminController.getAllAppointments
);
router.put(
  '/appointments/:id',
  authMiddleware,
  adminMiddleware,
  adminController.updateAppointment
);

module.exports = router;
