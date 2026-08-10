// utils/matchUtils.js — matching engine-er jonno helper data ar function

// DIU (Daffodil International University) campus-er ashe pashe-r area-r approximate lat/lng center
const AREA_COORDS = {
  Dattapara: { lat: 23.8950, lng: 90.3600 },
  Ashulia: { lat: 23.9000, lng: 90.3500 },
  Birulia: { lat: 23.8830, lng: 90.3360 },
  Panchbati: { lat: 23.8975, lng: 90.3550 },
  Uttara: { lat: 23.8759, lng: 90.3795 },
  "Model Town": { lat: 23.8700, lng: 90.3850 },
  Khagan: { lat: 23.9050, lng: 90.3420 },
  "Turag Fashion": { lat: 23.8850, lng: 90.3650 },
  Chandona: { lat: 23.9150, lng: 90.3900 },
  Kumkumari: { lat: 23.9100, lng: 90.3470 },
  "Mirpur Kolma": { lat: 23.8350, lng: 90.3600 }
};

// Kon area-r kache kon area ache, eita locationScore calculate korte lagbe
const NEARBY = {
  Dattapara: ["Ashulia", "Panchbati"],
  Ashulia: ["Dattapara", "Khagan"],
  Birulia: ["Panchbati", "Turag Fashion"],
  Panchbati: ["Dattapara", "Birulia"],
  Uttara: ["Model Town", "Turag Fashion"],
  "Model Town": ["Uttara", "Mirpur Kolma"],
  Khagan: ["Ashulia", "Kumkumari"],
  "Turag Fashion": ["Birulia", "Uttara"],
  Chandona: ["Khagan", "Kumkumari"],
  Kumkumari: ["Khagan", "Chandona"],
  "Mirpur Kolma": ["Model Town", "Uttara"]
};

// Duita lat/lng point-er majhe real distance (km) — Haversine formula
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Property-r "capacity" ber kora (bedrooms/seats/cabins/rooms — jetai thake)
function capacityFor(property) {
  const d = property.details || {};
  return parseInt(d.bedrooms || d.seats || d.cabins || d.rooms || 1) || 1;
}

// Ekta property-ke tenant-er requirement diye score deoya (0-100)
// weights: location .30, budget .25, type .15, rooms .10, facility .10, distance .10
function scoreProperty(property, req) {
  const locScore =
    property.loc === req.location
      ? 100
      : (NEARBY[req.location] || []).includes(property.loc)
      ? 55
      : 20;

  let budgetScore;
  if (property.rent <= req.budget) {
    budgetScore = 100 - Math.max(0, (req.budget - property.rent) / req.budget) * 15;
  } else {
    budgetScore = Math.max(0, 100 - ((property.rent - req.budget) / req.budget) * 180);
  }

  const typeScore = property.type === req.type ? 100 : 25;

  const roomDiff = Math.abs(capacityFor(property) - req.rooms);
  const roomScore = roomDiff === 0 ? 100 : roomDiff === 1 ? 65 : 30;

  const wanted = req.facilities || [];
  const facilityScore = wanted.length
    ? (wanted.filter((f) => property.facilities.includes(f)).length / wanted.length) * 100
    : 100;

  const center = req.center || AREA_COORDS[req.location] || AREA_COORDS.Mirpur;
  const dist = +haversineKm(property.lat, property.lng, center.lat, center.lng).toFixed(1);
  const distScore =
    dist <= req.radius ? Math.max(0, 100 - dist * 9) : Math.max(0, 40 - (dist - req.radius) * 10);

  const total =
    locScore * 0.3 +
    budgetScore * 0.25 +
    typeScore * 0.15 +
    roomScore * 0.1 +
    facilityScore * 0.1 +
    distScore * 0.1;

  return {
    total: Math.round(total),
    locScore,
    budgetScore,
    typeScore,
    roomScore,
    facilityScore,
    distScore,
    dist
  };
}

module.exports = { AREA_COORDS, NEARBY, haversineKm, capacityFor, scoreProperty };
