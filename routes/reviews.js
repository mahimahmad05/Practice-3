// routes/reviews.js — Property-r review dekhano ar notun review add kora
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET /api/reviews/:propertyId  → shei property-r shob review + average rating
router.get('/:propertyId', async (req, res) => {
  try {
    const reviews = await Review.find({ propertyId: req.params.propertyId }).sort({ createdAt: -1 });
    const avgRating = reviews.length
      ? +(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;
    res.json({ reviews, avgRating, count: reviews.length });
  } catch (err) {
    res.status(500).json({ error: 'Review load korte problem hoyeche: ' + err.message });
  }
});

// POST /api/reviews  → notun review add kora
// body: { propertyId, reviewerName, rating, comment }
router.post('/', async (req, res) => {
  try {
    const { propertyId, reviewerName, rating, comment } = req.body;
    if (!propertyId || !reviewerName || !rating) {
      return res.status(400).json({ error: 'propertyId, reviewerName, ar rating lagbe' });
    }
    const review = new Review({ propertyId, reviewerName, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: 'Review add korte problem hoyeche: ' + err.message });
  }
});

module.exports = router;
