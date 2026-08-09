// seed.js — HTML demo-r 13 ta mock listing MongoDB-e insert kore
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Property = require('./models/Property');

const seedProperties = [
  { name: "Sunrise Apartments 2B", loc: "Mohammadpur", type: "Apartment", rent: 19500, lat: 23.7657, lng: 90.3585, facilities: ["WiFi", "Generator", "Security"], verified: true, details: { bedrooms: 2, bathrooms: 2, floor: 4, furnished: "Yes" } },
  { name: "Green View Sublet Room", loc: "Mirpur", type: "Sublet", rent: 8000, lat: 23.8223, lng: 90.3654, facilities: ["WiFi", "Furnished"], verified: true, details: { seats: 1, gender: "Male" } },
  { name: "Lakeview Family House", loc: "Dhanmondi", type: "Family House", rent: 65000, lat: 23.7461, lng: 90.3742, facilities: ["Lift", "Parking", "Generator", "Security"], verified: true, details: { bedrooms: 5, floors: 3, landArea: 4 } },
  { name: "Uttara Co-working Suite", loc: "Uttara", type: "Co-working Space", rent: 25000, lat: 23.8759, lng: 90.3795, facilities: ["WiFi", "Lift", "Parking"], verified: false, details: { seats: 20, privateCabin: "Yes" } },
  { name: "Bashundhara Single Room", loc: "Bashundhara", type: "Room", rent: 11000, lat: 23.8103, lng: 90.4125, facilities: ["WiFi", "Furnished", "Security"], verified: true, details: { roomType: "Single", attachedBath: "Yes" } },
  { name: "Savar Riverside Apartment", loc: "Savar", type: "Apartment", rent: 14500, lat: 23.8583, lng: 90.2667, facilities: ["Generator", "Parking"], verified: true, details: { bedrooms: 2, bathrooms: 1, floor: 2, furnished: "No" } },
  { name: "Mirpur Corner Shop Space", loc: "Mirpur", type: "Shop", rent: 21000, lat: 23.8223, lng: 90.3654, facilities: ["Security", "Generator"], verified: false, details: { frontage: 16, area: 400 } },
  { name: "Dhanmondi Girls' Mess Seat", loc: "Dhanmondi", type: "Mess", rent: 6500, lat: 23.7461, lng: 90.3742, facilities: ["WiFi"], verified: true, details: { seats: 6, meal: "Yes", gender: "Female" } },
  { name: "Mohammadpur Family Flat 3B", loc: "Mohammadpur", type: "Apartment", rent: 27000, lat: 23.7657, lng: 90.3585, facilities: ["Lift", "Generator", "Parking", "Security"], verified: true, details: { bedrooms: 3, bathrooms: 2, floor: 5, furnished: "Yes" } },
  { name: "Uttara Warehouse Block C", loc: "Uttara", type: "Warehouse", rent: 48000, lat: 23.8759, lng: 90.3795, facilities: ["Security", "Parking"], verified: true, details: { area: 3200, loadingDock: "Yes" } },
  { name: "Savar Student Seat", loc: "Savar", type: "Seat", rent: 3500, lat: 23.8583, lng: 90.2667, facilities: ["WiFi"], verified: true, details: { seatType: "Bunk", gender: "Male" } },
  { name: "Bashundhara Office Floor", loc: "Bashundhara", type: "Office", rent: 55000, lat: 23.8103, lng: 90.4125, facilities: ["WiFi", "Lift", "Parking", "Generator"], verified: true, details: { area: 1800, cabins: 4, meetingRoom: "Yes" } },
  { name: "Dhanmondi Restaurant Space", loc: "Dhanmondi", type: "Restaurant Space", rent: 70000, lat: 23.7461, lng: 90.3742, facilities: ["Generator", "Security"], verified: false, details: { seating: 60, kitchen: "Yes" } }
];

async function seed() {
  await connectDB();
  await Property.deleteMany({}); // purono data thakle clear kore dey, jate duplicate na hoy
  await Property.insertMany(seedProperties);
  console.log(`✅ ${seedProperties.length} ta property insert kora hoyeche`);
  mongoose.connection.close();
}

seed();
