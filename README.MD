# RentMatch BD

RentMatch BD is a full-stack rental marketplace backend designed to help tenants discover suitable living spaces and help property owners publish verified listings. The platform supports role-based access, automated property matching, approval workflows, and review management.

## Overview

This project provides the backend API for a rental discovery platform where:

- Tenants can search and evaluate rental options based on location, budget, room preference, and facilities.
- Owners can publish property listings with photos, videos, NID information, and move-in details.
- Admins can verify and approve listings to maintain trust and quality.
- Users can leave reviews and provide real feedback about rental experiences.

## Key Features

- User authentication with JWT-based login/signup
- Role-based access for tenant, owner, and admin
- Property listing creation, retrieval, editing, and deletion
- Admin verification workflow for published properties
- Smart matching engine that ranks properties by tenant preference
- Support for location, type, gender preference, budget, room count, and facility filtering
- Owner-specific listing access
- Review APIs with rating and feedback support
- Seed data for demo and local testing

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt.js for password hashing
- dotenv for environment configuration
- CORS for cross-origin requests

## Project Structure

```text
RENTMATCH/
├── config/
│   └── db.js
├── middleware/
│   ├── auth.js
│   ├── optionalAuth.js
│   └── requireAdmin.js
├── models/
│   ├── Property.js
│   ├── Review.js
│   └── User.js
├── routes/
│   ├── auth.js
│   ├── match.js
│   ├── properties.js
│   └── reviews.js
├── utils/
│   └── matchUtils.js
├── .env
├── package.json
├── seed.js
├── server.js
└── README.MD
```

## Prerequisites

Before running the project, make sure you have:

- Node.js v18 or newer
- MongoDB instance running locally or on MongoDB Atlas
- npm installed

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/rentmatch
JWT_SECRET=your_super_secret_key
```

If you are using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

## Installation

```bash
npm install
```

## Run the Application

Start the backend server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## Seed Demo Data

Populate the database with sample rental listings:

```bash
npm run seed
```

This inserts mock property records so the app can be tested immediately without manually adding listings.

## API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication

- `POST /api/auth/signup` — create a new user account
- `POST /api/auth/login` — log in a user and receive a JWT

Example signup payload:

```json
{
  "name": "Rahim",
  "email": "rahim@example.com",
  "password": "secret123",
  "role": "tenant"
}
```

Example login payload:

```json
{
  "email": "rahim@example.com",
  "password": "secret123"
}
```

### Properties

- `GET /api/properties` — list all properties with optional filters
- `GET /api/properties/:id` — fetch a single property
- `POST /api/properties` — create a new property listing
- `PATCH /api/properties/:id/edit` — edit a property owned by the logged-in user
- `PATCH /api/properties/:id/verify` — admin verification of a property
- `DELETE /api/properties/:id` — delete a property
- `GET /api/properties/mine` — fetch listings owned by the authenticated user

Example property creation payload:

```json
{
  "name": "Lakeview Family House",
  "loc": "Uttara",
  "type": "Family House",
  "rent": 45000,
  "lat": 23.8759,
  "lng": 90.3795,
  "facilities": ["Lift", "Parking", "Generator"],
  "details": {
    "bedrooms": 5,
    "floors": 3,
    "landArea": 4
  },
  "photo": "https://example.com/house.jpg",
  "whatsapp": "+8801700000000"
}
```

### Matching Engine

- `POST /api/match` — score and rank properties based on tenant preferences

Example matching payload:

```json
{
  "location": "Uttara",
  "budget": 50000,
  "type": "Apartment",
  "rooms": 2,
  "facilities": ["Parking", "Generator"],
  "gender": "Any"
}
```

The matching service evaluates properties and sorts them by the highest compatibility score.

### Reviews

- `GET /api/reviews` — get reviews
- `POST /api/reviews` — create a review
- `DELETE /api/reviews/:id` — delete a review

## Authentication Notes

JWT tokens are issued on signup and login. Protected routes require the token to be sent in the `Authorization` header:

```http
Authorization: Bearer <token>
```

## Role Permissions

- `tenant` — can browse listings and submit match requests
- `owner` — can add and manage personal listings
- `admin` — can verify properties and manage listings across the platform

## Application Flow

1. A user signs up or logs in.
2. Owners create rental listings with metadata, location, pricing, and facilities.
3. Admins review and verify approved listings.
4. Tenants submit matching preferences.
5. The system ranks matching properties by relevance and score.
6. Users can leave reviews to improve trust and transparency.

## Notes

- The backend is built as a modular API with separate route, model, and middleware layers.
- It is designed to integrate easily with a frontend application such as React or Next.js.
- The project is suitable for learning, demo deployment, hackathons, or extension into a production-ready rental marketplace.

## License

This project is currently licensed under the ISC license as defined in `package.json`.

## Future Enhancements

Possible next steps for the project include:

- Frontend dashboard for owners and admins
- Image upload integration with Cloudinary
- Real-time chat between tenants and owners
- Advanced filters and pagination
- Search analytics and recommendation improvements
- Payment and booking workflow
