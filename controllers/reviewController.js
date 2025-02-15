const { Review } = require('../models');

exports.leaveReview = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId, rating, comment } = req.body;
    const review = await Review.create({
      userId,
      appointmentId,
      rating,
      comment,
    });
    res.status(201).json({ message: 'Review submitted successfully', review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.respondReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { response } = req.body;
    await Review.update({ response }, { where: { id: reviewId } });
    res.json({ message: 'Response added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
