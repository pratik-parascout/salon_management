const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, staffController.createStaff);
router.get('/', staffController.getStaff);
router.put('/:id', authMiddleware, staffController.updateStaff);
router.post(
  '/:id/assign-service',
  authMiddleware,
  staffController.assignService
);

module.exports = router;
