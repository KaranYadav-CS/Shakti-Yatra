# SHAKTI YATRA
## Smart Pilgrimage Assistance Platform

**Developer:** Karan Yadav  
**Project Type:** Full-Stack AI-Powered Pilgrimage Assistance Platform  
**First Destination:** Vindhyachal, Uttar Pradesh, India

---

## 1. Project Vision

Build a modern, highly interactive, visually impressive and fully functional pilgrimage assistance platform called:

# SHAKTI YATRA

### Tagline

> Discover. Plan. Experience.

The platform should help devotees:

- Discover pilgrimage destinations
- Understand religious and cultural significance
- Plan their journey
- Find nearby hotels and restaurants
- Find transportation
- Discover nearby attractions
- Understand temple timings and facilities
- Find verified emergency information
- Create itineraries
- Get accessibility-oriented recommendations
- Ask an AI pilgrimage assistant questions
- Save their Yatra
- Access official temple/service links

The application should feel like a combination of:

**Google Maps + modern travel application + pilgrimage guide + AI assistant**

with its own unique identity.

---

# 2. Developer Information

Display the developer information in an appropriate location such as the About section/footer:

**Developed by Karan Yadav**

Do not make the developer name unnecessarily prominent on the homepage.

---

# 3. First Destination — Vindhyachal

The first fully implemented destination must be:

**Vindhyachal**

The architecture must remain generic so additional destinations and Shakti Peeths can be added later without rewriting the core application.

Future destinations can include:

- Vaishno Devi
- Kamakhya
- Kalighat
- Jwala Ji
- Naina Devi
- Other supported pilgrimage destinations

The first demo should feel like a complete Vindhyachal experience rather than a large directory containing incomplete destinations.

---

# 4. Homepage Experience

The homepage should immediately feel premium and immersive.

### Hero

## Welcome to Vindhyachal

Subtitle:

> Your intelligent companion for a meaningful pilgrimage.

Primary actions:

- **Plan My Yatra**
- **Explore Vindhyachal**
- **Ask Shakti Assistant**

---

# 5. Hero 3D Experience

Use modern WebGL/3D technology where appropriate.

Preferred technologies:

- Three.js
- React Three Fiber
- @react-three/drei

Create a visually attractive 3D pilgrimage-themed environment.

Possible concept:

- Glowing particles
- Soft atmospheric movement
- Temple-inspired geometry
- Circular orbital motion
- Floating spiritual/travel elements
- Subtle depth and lighting

The experience should feel:

- Elegant
- Spiritual
- Modern
- Cinematic
- Premium

Do not make it look like a video game.

Do not use continuous heavy animation everywhere.

---

# 6. Interactive 3D / Hover Effects

Important UI elements should react naturally to the cursor.

### Temple cards

On hover:

- Card slightly lifts
- Image gently zooms
- Shadow/depth changes
- Additional information appears smoothly

### Images

On hover:

- Subtle zoom
- Slight parallax
- Smooth transition

### 3D objects

When the cursor moves:

- Object reacts slightly to cursor position
- Smooth rotation
- Subtle depth effect

Use spring-based animation rather than abrupt movement.

---

# 7. Solar-System-Style Destination Navigation

Create an optional interactive destination visualization.

Concept:

A central object represents:

**Shakti Yatra**

Around it are orbiting destinations.

Example:

```text
                 Kamakhya
                    ○

        Vaishno Devi ○

              [SHAKTI YATRA]

             Vindhyachal ○
```

Vindhyachal should be highlighted because it is the currently active destination.

Future destinations can be added as orbiting nodes.

Clicking a destination should smoothly transition to that destination.

Provide a normal list/grid alternative for accessibility and mobile devices.

The 3D experience must never prevent normal navigation.

---

# 8. Vindhyachal Hero

Create a visually rich Vindhyachal section containing:

- High-quality temple imagery
- Location
- Short introduction
- Religious significance
- Quick facts
- Explore button
- Plan Yatra button

Use cinematic image transitions.

Images should support:

- Zoom
- Parallax
- Hover interaction
- Smooth entrance animation

Use properly sourced/licensed images.

---

# 9. Temple Explorer

Create a searchable destination explorer.

Search placeholder:

> Search temples, destinations, attractions...

Filters:

- State
- City
- Destination type
- Nearby services
- Accessibility

Cards should contain:

- Image
- Name
- Location
- Short description
- Explore button

The search must actually work.

Do not create a fake search box.

---

# 10. Vindhyachal Detail Page

Create:

`/destinations/vindhyachal`

Sections:

1. Hero
2. Overview
3. Why Vindhyachal is Important
4. Temple Information
5. Darshan Information
6. How to Reach
7. Nearby Hotels
8. Nearby Restaurants
9. Nearby Attractions
10. Facilities
11. Accessibility
12. Emergency Assistance
13. Yatra Planner
14. AI Assistant
15. Official Sources

Use smooth scrolling and section navigation.

---

# 11. Why Vindhyachal?

Create an immersive storytelling section.

Categories:

### Spiritual Significance

### Historical Background

### Festivals

### Local Culture

### Important Nearby Religious Places

### Local Food

### Things to Know Before Visiting

Use cards, timeline animations and image-based storytelling.

All factual information must come from verified sources.

---

# 12. Interactive Temple Story

Create a vertical timeline:

```text
Origin
   ↓
History
   ↓
Religious Significance
   ↓
Important Traditions
   ↓
Festivals
   ↓
Modern Pilgrimage
```

As the user scrolls:

- Timeline progresses
- Images transition
- Text fades/slides
- Background subtly changes

Keep animation smooth and performant.

---

# 13. Darshan / Yatra Planner

Create:

# Plan My Yatra

Inputs:

- Destination
- Date
- Number of travellers
- Duration
- Budget
- Senior citizens
- Children
- Accessibility requirements
- Preferred activities

Example:

```text
Destination: Vindhyachal
Duration: 2 Days
Travellers: 4
Senior Citizens: Yes
Budget: ₹8,000
```

Generate a structured itinerary.

Example:

```text
DAY 1

Arrival
↓
Hotel
↓
Temple visit
↓
Lunch
↓
Nearby attraction
↓
Evening activity

DAY 2

Pilgrimage visit
↓
Local sightseeing
↓
Food
↓
Departure
```

Clearly label AI-generated recommendations.

Do not invent actual temple timings or availability.

---

# 14. Map Experience

Create an interactive map.

Show:

- Temple
- Hotels
- Restaurants
- Railway station
- Bus station
- Parking
- Hospitals
- Pharmacies
- Attractions
- Other important facilities

Use Google Maps or Mapbox through a configuration/backend layer.

Do not hard-code fake coordinates.

---

# 15. Nearby Services

Create category-based services.

## Stay

- Hotels
- Dharamshalas
- Guest houses

## Food

- Restaurants
- Local food

## Travel

- Railway station
- Bus station
- Parking
- Taxi/transport

## Facilities

- ATM
- Medical
- Pharmacy
- Washroom
- Drinking water
- Cloakroom

Each listing should support:

- Name
- Distance
- Location
- Map
- Source
- Verification status

Do not fabricate businesses.

---

# 16. Nearby Attractions

Create an interactive "Explore Nearby" section.

Cards should include:

- Image
- Name
- Distance
- Description
- Why visit
- Map button

On hover:

- Image zoom
- Card elevation
- Subtle 3D tilt

On click:

- Open detailed attraction view

---

# 17. AI Pilgrimage Assistant

Create:

# Shakti Assistant

Use a floating AI button throughout the application.

Example questions:

> I am visiting Vindhyachal with my parents.

> I only have 6 hours.

> I want minimum walking.

> What should I visit nearby?

> Create a two-day itinerary.

> What facilities are available?

The assistant must use verified application data.

If information is unavailable:

> I don't have verified information for that yet.

Never hallucinate:

- Temple timings
- Emergency numbers
- Booking availability
- Hotel availability
- Prices
- Official rules

---

# 18. AI Visual Design

The AI assistant should have a distinctive but clean interface.

Use:

- Subtle animated AI orb
- Glowing particles
- Typing animation
- Smooth message transitions
- Suggested prompts

Example:

```text
        ✦
   SHAKTI ASSISTANT

How can I help with your Yatra?

[ Plan my Vindhyachal trip ]

[ What should I visit nearby? ]

[ I am travelling with elderly parents ]
```

The animation should remain subtle and should not slow down the website.

---

# 19. Accessibility Mode

Allow users to select:

- Normal traveller
- Senior citizen
- Family
- Child
- Person with disability
- Solo traveller

Recommendations should adapt accordingly.

For elderly users:

- Lower walking recommendations
- Rest points
- Medical facilities
- Accessible transportation where verified
- Important assistance information

---

# 20. Emergency Center

Create a prominent:

# Emergency Assistance

Show verified:

- Police
- Ambulance
- Hospital
- Pharmacy
- Temple authority
- Tourist assistance
- Lost and Found

Add:

**Share My Location**

where browser permissions allow it.

Never invent emergency numbers.

Every emergency record should have:

- Source
- Verification status
- Last verified date

---

# 21. My Yatra

Authenticated users can save their pilgrimage.

Example:

```text
MY YATRA

Vindhyachal
2 Days
4 Travellers

Travel
 ↓
Hotel
 ↓
Temple
 ↓
Food
 ↓
Attractions
 ↓
Return
```

Allow users to:

- Save itinerary
- Save attractions
- Save hotels
- Add notes
- View trip history

---

# 22. Admin Dashboard

Create:

`/admin`

Dashboard should include:

- Total destinations
- Total attractions
- Total facilities
- Data needing verification
- Recently updated information

Admin can:

- Add destination
- Edit destination
- Delete destination
- Add temple information
- Add attraction
- Add hotel
- Add restaurant
- Add facility
- Add emergency contact
- Add official source
- Update timings
- Update festival information
- Mark information verified

Every factual record should support:

```text
source_url
source_name
verified
last_verified_at
```

---

# 23. Database

Use PostgreSQL.

Tables:

```text
users
destinations
temples
temple_timings
temple_festivals
facilities
hotels
restaurants
attractions
transport_points
emergency_contacts
itineraries
itinerary_items
saved_places
sources
```

Use proper foreign keys, indexes and relationships.

---

# 24. Backend

Use:

**Python + FastAPI**

Create separate service layers for:

- Destination service
- Map service
- Places service
- Itinerary service
- AI service
- Authentication
- Admin service

Create proper REST APIs.

Provide Swagger/OpenAPI documentation.

---

# 25. Frontend

Use:

- Next.js
- TypeScript
- Tailwind CSS
- React
- Framer Motion
- React Three Fiber
- Three.js

Use reusable components.

Suggested structure:

```text
frontend/
├── components/
│   ├── 3d/
│   ├── temple/
│   ├── map/
│   ├── itinerary/
│   ├── ai/
│   ├── navigation/
│   └── common/
│
├── app/
├── hooks/
├── services/
└── lib/
```

---

# 26. Performance Requirements

3D and animation must not make the application unusable.

Requirements:

- Lazy-load heavy 3D components
- Optimize images
- Compress assets
- Use responsive images
- Avoid unnecessary re-renders
- Support reduced-motion preferences
- Disable heavy 3D effects on low-performance/mobile devices where necessary
- Keep normal navigation available if WebGL is unavailable

The application must remain usable without 3D.

---

# 27. Mobile Experience

The website must be fully responsive.

Suggested mobile navigation:

```text
Home
Explore
Plan
Map
My Yatra
```

The AI assistant should remain easily accessible.

Use large touch targets for important actions.

Emergency assistance should be quickly accessible.

---

# 28. Visual Design System

Design language:

**Modern + Spiritual + Premium + Travel**

Avoid:

- Excessive religious symbols
- Clutter
- Too many colors
- Excessive animation
- Game-like UI

Use:

- Elegant typography
- High-quality photography
- Glassmorphism where appropriate
- Subtle gradients
- Depth
- Shadows
- Smooth transitions
- Cinematic section transitions

The application should feel like a premium modern travel product rather than a traditional static temple website.

---

# 29. Search

Search must actually work.

Support:

- Destination name
- Temple name
- Attraction
- Hotel
- Restaurant
- Facility

Provide:

- Autocomplete
- Recent searches
- Filters
- Clear search
- Empty-state message

Example:

Searching:

`Vindh`

should return:

**Vindhyachal**

---

# 30. Data Quality

This is critical.

Never generate fake factual data.

Use verified sources.

Separate:

### Official information

### Verified application information

### User-generated information

### AI-generated recommendations

The UI should make this distinction clear.

---

# 31. Initial Vindhyachal Data

Create the database structure and seed-data format first.

Do not invent uncertain information.

The project should contain clearly marked fields for:

- Official temple name
- Location
- Description
- Significance
- Timings
- Official website
- Official contacts
- Nearby attractions
- Nearby facilities
- Emergency contacts
- Transport
- Sources

If a field has not yet been verified, display:

**Information pending verification**

instead of creating fictional information.

---

# 32. Future Destination Architecture

The application should eventually support:

- Vindhyachal
- Vaishno Devi
- Kamakhya
- Kalighat
- Jwala Ji
- Naina Devi
- Other destinations

Adding a destination should primarily require adding database records rather than rewriting frontend/backend logic.

---

# 33. Project Structure

```text
shakti-yatra/
│
├── frontend/
├── backend/
├── database/
├── data/
├── docs/
├── tests/
├── scripts/
├── docker-compose.yml
├── .env.example
└── README.md
```

---

# 34. Development Phases

### PHASE 1
Project architecture

### PHASE 2
Database and seed system

### PHASE 3
Modern homepage

### PHASE 4
Vindhyachal destination page

### PHASE 5
Temple Explorer and search

### PHASE 6
Maps and nearby services

### PHASE 7
Yatra Planner

### PHASE 8
Authentication and My Yatra

### PHASE 9
Admin dashboard

### PHASE 10
AI Assistant

### PHASE 11
Emergency and accessibility

### PHASE 12
3D polish and advanced animations

### PHASE 13
Testing

### PHASE 14
Performance optimization

### PHASE 15
AWS deployment preparation

---

# 35. Important Antigravity Instructions

Do not build the entire application as one giant unstructured implementation.

Work phase by phase.

After every phase:

1. Run the application.
2. Check frontend.
3. Check backend.
4. Check database.
5. Fix errors.
6. Verify previous features still work.
7. Only then continue.

Do not replace working components unnecessarily.

Do not create fake data simply to make the interface appear complete.

Do not expose API keys.

Do not hard-code secrets.

Keep the application maintainable and understandable to a student developer.

---

# 36. Final Product Experience

When a user opens the website, the experience should be approximately:

```text
                 SHAKTI YATRA

          Discover. Plan. Experience.

                [3D EXPERIENCE]

             Welcome to Vindhyachal

       Your intelligent companion for a
              meaningful pilgrimage.

       [ Explore Vindhyachal ]
       [ Plan My Yatra ]

                 ↓ SCROLL

            Why Vindhyachal?

                 ↓

         Temple Story / Timeline

                 ↓

          Explore Nearby Places

                 ↓

             Plan My Yatra

                 ↓

           Shakti AI Assistant

                 ↓

          Emergency Assistance

                 ↓

              My Yatra

                 ↓

          Developed by Karan Yadav
```

The final result must be a real working full-stack application, not merely a visually attractive prototype.

---

# 37. Final Product Principle

The project should balance:

**WOW factor + usability + real data + AI + accessibility + performance.**

3D should create an immersive first impression.

Practical features should make the platform genuinely useful.

Verified information should build trust.

AI should assist rather than invent.

The application should be scalable from one destination (Vindhyachal) to a large pilgrimage platform.
