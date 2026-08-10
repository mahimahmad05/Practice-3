// routes/properties.js — Property list dekhano ar notun listing add korar API
const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const requireAuth = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');
const optionalAuth = require('../middleware/optionalAuth');

// GET /api/properties  → shob listing dekhabe (?type=Apartment ar ?verified=false diye filter kora jay)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.type && req.query.type !== 'All') {
      filter.type = req.query.type;
    }
    if (req.query.verified === 'true') filter.verified = true;
    if (req.query.verified === 'false') filter.verified = false;
    const properties = await Property.find(filter).sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: 'Listings load korte problem hoyeche' });
  }
});

// GET /api/properties/mine  → logged-in owner-er nijer shob listing (login lagbe)
router.get('/mine', requireAuth, async (req, res) => {
  try {
    const properties = await Property.find({ ownerId: req.user.id }).sort({ createdAt: -1 });
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

// POST /api/properties  → notun listing add kora (owner form theke); login kora thakle ownerId auto-attach hoy
router.post('/', optionalAuth, async (req, res) => {
  try {
    const propertyData = { ...req.body };
    if (req.user) propertyData.ownerId = req.user.id;
    const newProperty = new Property(propertyData);
    const saved = await newProperty.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Listing save korte problem hoyeche: ' + err.message });
  }
});

// PATCH /api/properties/:id/verify  → admin-i shudhu ekta listing "approve" (verified=true) korte parbe
router.patch('/:id/verify', requireAuth, requireAdmin, async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(req.params.id, { verified: true }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Property pawa jay nai' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Approve korte problem hoyeche: ' + err.message });
  }
});

// PATCH /api/properties/:id/edit  → owner nijer listing edit korte parbe (naam, rent, facilities, ityadi)
router.patch('/:id/edit', requireAuth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property pawa jay nai' });
    const isOwner = property.ownerId && property.ownerId.toString() === req.user.id;
    if (!isOwner) return res.status(403).json({ error: 'Shudhu tumi nijer listing-i edit korte parbe' });

    const { name, rent, facilities, details, photo, video, whatsapp, nidNumber, nidPhoto } = req.body;
    if (name !== undefined) property.name = name;
    if (rent !== undefined) property.rent = rent;
    if (facilities !== undefined) property.facilities = facilities;
    if (details !== undefined) property.details = details;
    if (photo !== undefined) property.photo = photo;
    if (video !== undefined) property.video = video;
    if (whatsapp !== undefined) property.whatsapp = whatsapp;
    if (nidNumber !== undefined) property.nidNumber = nidNumber;
    if (nidPhoto !== undefined) property.nidPhoto = nidPhoto;
    property.verified = false; // content change hoyeche, admin-ke abar review korte hobe

    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: 'Edit korte problem hoyeche: ' + err.message });
  }
});

// DELETE /api/properties/:id  → admin ba listing-er real owner delete korte parbe
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property pawa jay nai' });
    const isOwner = property.ownerId && property.ownerId.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'Ei listing muche felar permission tomar nai' });

    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Delete kora hoyeche' });
  } catch (err) {
    res.status(500).json({ error: 'Delete korte problem hoyeche: ' + err.message });
  }
});

module.exports = router;
