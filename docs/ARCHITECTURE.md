# SHAKTI YATRA — System Architecture

**Developer:** Karan Yadav  
**Platform:** Full-Stack AI-Powered Pilgrimage Assistance Platform  
**First Destination:** Vindhyachal, Uttar Pradesh, India

---

## 1. High-Level Architectural Diagram

```text
+--------------------------------------------------------------------------+
|                        CLIENT INTERACTION LAYER                          |
|                                                                          |
|  Next.js 14 (App Router) + TypeScript + Tailwind CSS                     |
|  Three.js WebGL Engine (Orbital Particles & Solar System Navigator)      |
|  Shakti AI Floating Assistant Modal + Interactive Leaflet/GIS Maps       |
+--------------------------------------------------------------------------+
                                    |
                            HTTP / REST / JSON
                                    |
+--------------------------------------------------------------------------+
|                          FASTAPI SERVICE LAYER                           |
|                                                                          |
|  - Destinations Router (/api/destinations)                              |
|  - Temple & Landmark Search Engine (/api/search)                         |
|  - Pilgrimage Services & Facilities (/api/services)                      |
|  - Verified Emergency Hub (/api/emergency)                               |
|  - Smart Yatra Planner & Generator (/api/itinerary)                      |
|  - Grounded Shakti Assistant (/api/assistant/chat)                       |
|  - JWT Authentication & Bookmarks (/api/auth, /api/my-yatra)             |
|  - Administrative Verification Console (/api/admin)                      |
+--------------------------------------------------------------------------+
                                    |
                           SQLAlchemy 2.0 ORM
                                    |
+--------------------------------------------------------------------------+
|                          PERSISTENCE LAYER                               |
|                                                                          |
|  Relational Database: SQLite (Zero-Config Dev) / PostgreSQL (Production) |
|  15 Interconnected Tables with Source & Audit Verification Metadata      |
+--------------------------------------------------------------------------+
```

---

## 2. Key Architecture Pillars

### I. Data Integrity & Verification Standards
Every factual record in the system contains:
- `source_name`: Official agency (e.g. UP Tourism, Vindhya Shrine Board, NHM UP)
- `source_url`: Verifiable portal link
- `verified`: Boolean integrity flag
- `last_verified_at`: Timestamp of latest audit

If information is pending verification, the platform displays an explicit notification banner rather than fabricating placeholder details.

### II. AI Assistant Grounding & Non-Hallucination
The **Shakti AI Assistant** uses retrieval-augmented verification logic:
- Strict prompt rules forbidding hallucination of temple hours, prices, or emergency contacts.
- Real-time fact extraction against verified shrine knowledge base.
- Transparent source attribution returned in every response payload.

### III. Accessibility-First Design
The platform provides a dedicated **Accessibility Toggle** adapting journeys for:
- **Senior Citizens:** Prioritizes the Vindhyachal aerial ropeway, golf carts, and flat corridor access.
- **Wheelchair Users:** Filters for step-free routes, elevators, and wide plazas.
- **Families:** Adapts rest periods and sattvik dining proximity.

### IV. Extensible Multi-Destination Schema
While Vindhyachal is the flagship active destination, all API routers, database tables, and solar navigators operate on a generic `slug` and `destination_id` architecture. Adding future destinations (such as *Vaishno Devi* or *Maa Kamakhya*) requires adding database rows without modifying core frontend or backend business logic.
