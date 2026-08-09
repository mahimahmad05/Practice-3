// routes/match.js — Tenant-er requirement niye shob property score+rank kore
const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const { scoreProperty } = require('../utils/matchUtils');

// POST /api/match
// body: { location, budget, type, rooms, facilities, radius, center? }
router.post('/', async (req, res) => {
  try {
    const req_body = req.body;

    // Basic validation — must-have fields check kora
    if (!req_body.location || !req_body.type || !req_body.budget) {
      return res.status(400).json({ error: 'location, type, ar budget lagbe' });
    }

    const properties = await Property.find({}); // shob listing DB theke ana

    const ranked = properties
      .map((p) => ({ property: p, score: scoreProperty(p, req_body) }))
      .sort((a, b) => b.score.total - a.score.total);

    res.json(ranked);
  } catch (err) {
    res.status(500).json({ error: 'Match korte problem hoyeche: ' + err.message });
  }
});

module.exports = router;
