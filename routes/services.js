const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, serviceController.createService);
router.get('/', serviceController.getServices);
router.put('/:id', authMiddleware, serviceController.updateService);
router.delete('/:id', authMiddleware, serviceController.deleteService);
router.post(
  '/availability',
  authMiddleware,
  serviceController.setServiceAvailability
);

module.exports = router;
