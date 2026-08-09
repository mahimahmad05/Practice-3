// utils/matchUtils.js — matching engine-er jonno helper data ar function

// Dhaka-r kichu area-r approximate lat/lng center (HTML demo theke neya)
const AREA_COORDS = {
  Mirpur: { lat: 23.8223, lng: 90.3654 },
  Dhanmondi: { lat: 23.7461, lng: 90.3742 },
  Mohammadpur: { lat: 23.7657, lng: 90.3585 },
  Uttara: { lat: 23.8759, lng: 90.3795 },
  Bashundhara: { lat: 23.8103, lng: 90.4125 },
  Savar: { lat: 23.8583, lng: 90.2667 }
};

// Kon area-r kache kon area ache, eita locationScore calculate korte lagbe
const NEARBY = {
  Mirpur: ["Mohammadpur", "Uttara"],
  Mohammadpur: ["Mirpur", "Dhanmondi"],
  Dhanmondi: ["Mohammadpur", "Bashundhara"],
  Uttara: ["Mirpur", "Bashundhara"],
  Bashundhara: ["Uttara", "Dhanmondi"],
  Savar: ["Mirpur"]
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
