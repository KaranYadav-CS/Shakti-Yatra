# SHAKTI YATRA — Smart Pilgrimage Assistance Platform

> **Discover. Plan. Experience.**

**Developer:** Karan Yadav  
**Project Type:** Full-Stack AI-Powered Pilgrimage Assistance Platform  
**Flagship Destination:** Vindhyachal, Mirzapur, Uttar Pradesh, India

---

## 🌟 Executive Summary

**Shakti Yatra** is a modern, full-stack pilgrimage assistance platform engineered to combine the visual depth of modern travel technologies with the reverence of sacred Hindu pilgrimage traditions.

The platform provides a comprehensive digital companion for devotees visiting **Vindhyachal Dham** — the celebrated Siddhpeeth of Adi Shakti Maa Vindhyavasini along the holy river Ganges — while establishing a scalable, extensible architecture for all major Shakti Peeths across India (such as *Vaishno Devi*, *Maa Kamakhya*, and *Kalighat*).

---

## ✨ Core Feature Highlights

### 1. Immersive 3D Pilgrimage Canvas (WebGL / Three.js)
- Spiritual ambient lighting, glowing cosmic particles, and sacred orbital rings.
- Spring-interpolated cursor responsiveness with depth parallax.
- Native performance optimizations with automatic fallback for low-power devices and reduced-motion preferences.

### 2. Celestial Solar-System Destination Orbit
- Interactive cosmic visualization: Central **Shakti Yatra** core surrounded by orbiting sacred destinations.
- Highlights active pilgrimage sanctuaries with real-time transition capabilities.
- Integrated **Accessible Grid View** toggle for mobile devices and screen readers.

### 3. Dedicated Maa Vindhyavasini Pavitra Darshan Gallery & Corner Frame
- Ornate golden-aura floating sanctum badge in the UI corner opening full-resolution darshan modal.
- Dedicated interactive photo module showcasing authentic shrine darshan photos with 3D depth cards and lightbox viewer.
- Synchronized welcome audio chant (`welcome_chant.mpeg`) playing once on opening.

### 4. History of Vindhyachal & Complete Divinity of Maa Vindhyavasini
- Dedicated module (`/history`) presenting deep scriptural and philosophical chronicles:
  - **Maa Vindhyavasini Utpatti:** Cosmic emergence as Mahalakshmi, Markandeya Purana & Durga Saptashati Chapter 11 shloka, Anadi Siddhpeeth vs. Shaktipeeth distinction.
  - **Vindhya Parvat Utpatti:** Puranic legend of Mount Vindhya and Sage Agastya's decree of perpetual humility.
  - **Ramayana Era Belongings:** 14-year exile of Prabhu Shri Ram, Mata Sita & Lakshmana; manifestation of Sita Kund; Ramgaya Ghat for Dasharatha Shraddha and Rameshwar Mahadev.
  - **Shri Krishna & Bhagavad Gita:** Devi Yogamaya's midnight birth to Yashoda, outwitting Kansa, celestial prophecy, and Bhagavad Gita Chapter 7.14 verse on divine Maya.
  - **Dharmic & Shraddha Philosophy:** The Trigunatmaka Trikona and the rare northward vortex of Uttarvahini Ganga.

### 5. Google Maps Location Intelligence & Neighbor Finder
- Real-time pinpoint switcher with embedded Google Maps interactive viewer.
- Direct turn-by-turn navigation buttons and distance calculation for hotels, dharamshalas, sacred ghats, and railway stations.
- Neighboring heritage towns circuit: Mirzapur City, Chunar Fort, Varanasi Kashi Vishwanath Dham, and Prayagraj Triveni Sangam.

### 6. Shakti AI Pilgrimage Assistant
- Floating spiritual assistant available across the application.
- Strictly grounded in verified shrine board records — **zero hallucinations** of timings, helplines, or prices.
- Transparent source attribution with citations and interactive suggested action chips.

### 7. Interactive Sanctuary Map & Real GIS Routing
- Filterable map pins covering temples, holy Ganga ghats, passenger ropeway stations, pure vegetarian dining, dharamshalas, and 24x7 medical clinics.
- Verified latitude/longitude coordinates with one-click Google Maps navigation routing.

### 8. Accessibility-First Pilgrimage Modes
- Dedicated profile selector: **Standard Pilgrim**, **Senior Citizen**, **Wheelchair Priority**, **Family with Children**, and **Solo Seeker**.
- Automatically highlights the Vindhyachal Aerial Ropeway (avoiding 150+ stairs for elderly devotees), battery cart services, and step-free corridor ramps.

### 9. Dynamic Yatra Planner
- Generates structured day-by-day itineraries tailored by group size, budget tier, and accessibility requirements.
- Synchronized with official Mangala, Rajbhog, Sandhya, and Shayan Aarti schedules.
- Allows saving to **My Yatra** and instant printing.

### 10. Verified Emergency Assistance Center
- Direct tap-to-call links for Police (`112`), Ambulance (`108`), Community Health Centre, and Shrine Control Room.
- **Share My Location** browser geolocation integration for rapid emergency responder dispatch.

### 11. Admin Verification Console (`/admin`)
- Real-time audit dashboard showing verification statistics and data integrity metrics.
- Re-verification workflows tracking `source_name`, `source_url`, and `last_verified_at` for every factual record.

---

## 🏗️ Technology Architecture

| Layer | Technologies Used |
|---|---|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Three.js, Lucide Icons |
| **Backend** | Python 3.11+, FastAPI, Uvicorn, Pydantic v2, PyJWT, Bcrypt |
| **Database** | SQLAlchemy 2.0 ORM, SQLite (local zero-config) / PostgreSQL (production) |
| **Deployment** | Docker, Docker Compose, Multi-stage builds |

---

## 🗄️ Relational Database Schema (15 Tables)

The database schema models the complete pilgrimage lifecycle with verified data governance:

1. `users` — Pilgrim accounts and admin permissions
2. `destinations` — Multi-sanctuary database (slug, coordinates, stories)
3. `temples` — Detailed temple profiles, deity, architecture, accessibility
4. `temple_timings` — Officially verified session hours (Mangala, Rajbhog, Sandhya, Shayan)
5. `temple_festivals` — Navratri, Kajali Mahotsav, and celebrations
6. `facilities` — Cloakrooms, RO water, lockers, and clean restrooms
7. `hotels` — Verified dharamshalas and UPSTDC tourist hotels
8. `restaurants` — Sattvik pure vegetarian dining and sweet shops
9. `attractions` — Sita Kund, Pakka Ghat, Sirsi Waterfalls, and nature trails
10. `transport_points` — Railway halts, bus stands, and aerial ropeway
11. `emergency_contacts` — Police, ambulance, trauma hospitals, and women helplines
12. `itineraries` — Generated pilgrimage plans
13. `itinerary_items` — Day-by-day time-slotted activity blocks
14. `saved_places` — User bookmarks and favorites
15. `sources` — Directory of official verification agencies

---

## 🚀 Quickstart Guide

### Prerequisites
- Node.js 18+ (tested on Node v25)
- Python 3.10+ (tested on Python 3.14)

### 1. Run Backend Server
```bash
cd backend
# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Seed database with verified records
python app/seed/runner.py

# Start FastAPI server
uvicorn app.main:app --reload --port 8000
```
Backend API will be running at `http://localhost:8000`.  
Swagger Docs: `http://localhost:8000/docs`.

### 2. Run Frontend Application
```bash
cd frontend
# Install dependencies (already prepared)
npm install

# Run development server
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🐳 Running with Docker Compose

To run the complete full-stack environment (PostgreSQL + FastAPI + Next.js):
```bash
docker-compose up --build
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- PostgreSQL: `localhost:5432`

---

## 🧪 Automated Testing

To run the automated backend test suite:
```bash
cd backend
python tests/test_api.py
```
Output:
```text
[*] Running API tests...
[OK] All 7 API tests passed with flying colors!
```

---

## 🏛️ Official Verification Sources

All factual records for Vindhyachal are grounded in authentic notices from:
- **Uttar Pradesh Tourism:** [uptourism.gov.in](https://uptourism.gov.in)
- **District Administration Mirzapur:** [mirzapur.nic.in](https://mirzapur.nic.in)
- **Maa Vindhyavasini Shrine Board & Pilgrim Administration**
- **National Health Mission UP:** [upnrhm.gov.in](https://upnrhm.gov.in)

---

## 👤 Developer Information

- **Developer:** Karan Yadav
- **Platform:** Shakti Yatra — Smart Pilgrimage Assistance Platform
- **Project Scope:** Full-Stack Architecture, 3D WebGL, Grounded AI, Accessibility Engineering
