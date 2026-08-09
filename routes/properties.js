// routes/properties.js — Property list dekhano ar notun listing add korar API
const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// GET /api/properties  → shob listing dekhabe (?type=Apartment diye filter kora jay)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.type && req.query.type !== 'All') {
      filter.type = req.query.type;
    }
    const properties = await Property.find(filter).sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: 'Listings load korte problem hoyeche' });
  }
});

// GET /api/properties/:id  → ekta shudhu property-r details
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property pawa jay nai' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: 'Property load korte problem hoyeche' });
  }
});

// POST /api/properties  → notun listing add kora (owner form theke)
router.post('/', async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    const saved = await newProperty.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Listing save korte problem hoyeche: ' + err.message });
  }
});

module.exports = router;
