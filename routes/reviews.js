const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, reviewController.leaveReview);
router.put('/:id/respond', authMiddleware, reviewController.respondReview);
router.get('/', reviewController.getReviews);

module.exports = router;
