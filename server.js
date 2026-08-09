// server.js — RentMatch BD backend entry point
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// ---- Database connect kora ----
connectDB();

// ---- Middleware ----
app.use(cors());                          // allow frontend (different origin) to call this API
app.use(express.json({ limit: '20mb' })); // 20mb — photo/video base64 hisebe pathanor jonno boro limit lagbe
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// ---- Health check route (test korar jonno: GET http://localhost:5000/) ----
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'RentMatch BD API is running' });
});

// ---- Routes ----
app.use('/api/properties', require('./routes/properties'));
app.use('/api/match', require('./routes/match'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
