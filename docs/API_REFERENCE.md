# SHAKTI YATRA — REST API Reference

Interactive OpenAPI / Swagger documentation is available locally at:
`http://localhost:8000/docs`

---

## Base URL
`/api`

---

## 1. Destinations Endpoints

### `GET /api/destinations`
List all destinations sorted by celestial orbit order.
- **Response 200**: Array of destination summary objects.

### `GET /api/destinations/{slug}`
Retrieve complete destination details (temples, timings, attractions, hotels, restaurants, facilities, emergency contacts).
- **Parameters**: `slug` (string, e.g., `vindhyachal`)
- **Response 200**: Full destination profile.

---

## 2. Search Endpoints

### `GET /api/search`
Global fuzzy and prefix search across destinations, temples, attractions, hotels, and facilities.
- **Parameters**:
  - `q` (required string): Search query (e.g., `Vindh`, `Ropeway`, `Kali`)
  - `category` (optional string): Filter by `temple`, `attraction`, `hotel`, `restaurant`, `facility`
- **Response 200**:
```json
{
  "query": "Vindh",
  "count": 2,
  "results": [
    {
      "id": 1,
      "type": "destination",
      "title": "Vindhyachal",
      "subtitle": "Mirzapur, Uttar Pradesh • Siddhpeeth",
      "url": "/destinations/vindhyachal",
      "verified": true
    }
  ]
}
```

---

## 3. Pilgrimage Services Endpoints

### `GET /api/services/hotels`
List hotels and dharamshalas.
- **Parameters**: `destination_id`, `wheelchair_accessible`

### `GET /api/services/restaurants`
List pure vegetarian dining options.
- **Parameters**: `destination_id`, `pure_veg_only`

### `GET /api/services/facilities`
List cloakrooms, ATMs, medical clinics, and washrooms.
- **Parameters**: `category` (e.g., `Cloakroom`, `ATM`, `Medical`)

---

## 4. Emergency Endpoints

### `GET /api/emergency`
Retrieve verified emergency responders with telephone helplines and audit dates.
- **Parameters**: `destination_slug` (default: `vindhyachal`)
- **Response 200**: Array of emergency contacts (Police 112, Ambulance 108, CHC, Temple Control Room).

---

## 5. Yatra Planner Endpoints

### `POST /api/itinerary/generate`
Generate dynamic accessibility-adapted pilgrimage itineraries.
- **Body**:
```json
{
  "destination": "Vindhyachal",
  "duration_days": 2,
  "travellers_count": 4,
  "has_elderly": true,
  "has_children": false,
  "accessibility_mode": "Senior",
  "budget_level": "Standard"
}
```

---

## 6. Shakti AI Assistant Endpoints

### `POST /api/assistant/chat`
Ask verified pilgrimage queries without hallucination risk.
- **Body**:
```json
{
  "message": "What are the timings for Maa Vindhyavasini temple?",
  "accessibility_mode": "Senior",
  "destination": "Vindhyachal"
}
```
- **Response 200**: Grounded reply, verified sources array, and suggested action chips.
