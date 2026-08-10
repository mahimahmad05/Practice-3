// seed.js — HTML demo-r 13 ta mock listing MongoDB-e insert kore
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Property = require('./models/Property');

const seedProperties = [
  { name: "Sunrise Apartments 2B", loc: "Dattapara", type: "Apartment", rent: 12500, lat: 23.8950, lng: 90.3600, facilities: ["WiFi", "Generator", "Security"], verified: true, details: { bedrooms: 2, bathrooms: 2, floor: 4, furnished: "Yes" } },
  { name: "Green View Sublet Room", loc: "Panchbati", type: "Sublet", rent: 6000, lat: 23.8975, lng: 90.3550, facilities: ["WiFi", "Furnished"], verified: true, details: { seats: 1, gender: "Male" } },
  { name: "Lakeview Family House", loc: "Uttara", type: "Family House", rent: 45000, lat: 23.8759, lng: 90.3795, facilities: ["Lift", "Parking", "Generator", "Security"], verified: true, details: { bedrooms: 5, floors: 3, landArea: 4 } },
  { name: "Ashulia Co-working Suite", loc: "Ashulia", type: "Co-working Space", rent: 18000, lat: 23.9000, lng: 90.3500, facilities: ["WiFi", "Lift", "Parking"], verified: false, details: { seats: 20, privateCabin: "Yes" } },
  { name: "Khagan Single Room", loc: "Khagan", type: "Room", rent: 7000, lat: 23.9050, lng: 90.3420, facilities: ["WiFi", "Furnished", "Security"], verified: true, details: { roomType: "Single", attachedBath: "Yes" } },
  { name: "Birulia Riverside Apartment", loc: "Birulia", type: "Apartment", rent: 10500, lat: 23.8830, lng: 90.3360, facilities: ["Generator", "Parking"], verified: true, details: { bedrooms: 2, bathrooms: 1, floor: 2, furnished: "No" } },
  { name: "Turag Fashion Corner Shop", loc: "Turag Fashion", type: "Shop", rent: 15000, lat: 23.8850, lng: 90.3650, facilities: ["Security", "Generator"], verified: false, details: { frontage: 16, area: 400 } },
  { name: "Chandona Girls' Mess Seat", loc: "Chandona", type: "Mess", rent: 4500, lat: 23.9150, lng: 90.3900, facilities: ["WiFi"], verified: true, details: { seats: 6, meal: "Yes", gender: "Female" } },
  { name: "Dattapara Family Flat 3B", loc: "Dattapara", type: "Apartment", rent: 16000, lat: 23.8950, lng: 90.3600, facilities: ["Lift", "Generator", "Parking", "Security"], verified: true, details: { bedrooms: 3, bathrooms: 2, floor: 5, furnished: "Yes" } },
  { name: "Kumkumari Warehouse Block C", loc: "Kumkumari", type: "Warehouse", rent: 32000, lat: 23.9100, lng: 90.3470, facilities: ["Security", "Parking"], verified: true, details: { area: 3200, loadingDock: "Yes" } },
  { name: "Mirpur Kolma Student Seat", loc: "Mirpur Kolma", type: "Seat", rent: 3000, lat: 23.8350, lng: 90.3600, facilities: ["WiFi"], verified: true, details: { seatType: "Bunk", gender: "Male" } },
  { name: "Model Town Office Floor", loc: "Model Town", type: "Office", rent: 38000, lat: 23.8700, lng: 90.3850, facilities: ["WiFi", "Lift", "Parking", "Generator"], verified: true, details: { area: 1800, cabins: 4, meetingRoom: "Yes" } },
  { name: "Khagan Boys' Mess Seat", loc: "Khagan", type: "Mess", rent: 4000, lat: 23.9050, lng: 90.3420, facilities: ["WiFi", "Security"], verified: true, details: { seats: 8, meal: "Yes", gender: "Male" } }
];

async function seed() {
  await connectDB();
  await Property.deleteMany({}); // purono data thakle clear kore dey, jate duplicate na hoy
  await Property.insertMany(seedProperties);
  console.log(`✅ ${seedProperties.length} ta property insert kora hoyeche`);
  mongoose.connection.close();
}

seed();
