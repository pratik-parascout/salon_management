const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, appointmentController.bookAppointment);
router.get('/', authMiddleware, appointmentController.getAppointments);
router.put(
  '/:id/reschedule',
  authMiddleware,
  appointmentController.rescheduleAppointment
);
router.put(
  '/:id/cancel',
  authMiddleware,
  appointmentController.cancelAppointment
);

module.exports = router;
