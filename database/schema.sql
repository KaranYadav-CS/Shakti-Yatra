-- ========================================================
-- SHAKTI YATRA - Relational Database Schema
-- Developer: Karan Yadav
-- First Destination: Vindhyachal, Uttar Pradesh, India
-- Compatible with PostgreSQL 13+ and SQLite 3.30+
-- ========================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Destinations Table
CREATE TABLE IF NOT EXISTS destinations (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    hero_image VARCHAR(1024),
    gallery_images JSON,
    short_description TEXT NOT NULL,
    overview TEXT NOT NULL,
    significance TEXT NOT NULL,
    history TEXT,
    spiritual_story TEXT,
    best_time_to_visit VARCHAR(255),
    nearest_railway VARCHAR(255),
    nearest_airport VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    orbit_order INT DEFAULT 0,
    source_name VARCHAR(255) DEFAULT 'UP Tourism / Vindhya Shrine Board',
    source_url VARCHAR(1024) DEFAULT 'https://uptourism.gov.in',
    verified BOOLEAN DEFAULT TRUE,
    last_verified_at VARCHAR(50) DEFAULT '2026-09-01',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Temples Table
CREATE TABLE IF NOT EXISTS temples (
    id SERIAL PRIMARY KEY,
    destination_id INT REFERENCES destinations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    deity VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    significance TEXT NOT NULL,
    architecture TEXT,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    image_url VARCHAR(1024),
    audio_guide_url VARCHAR(1024),
    dress_code VARCHAR(255) DEFAULT 'Modest traditional attire recommended',
    entry_fee VARCHAR(100) DEFAULT 'Free Entry',
    wheelchair_accessible BOOLEAN DEFAULT FALSE,
    accessibility_notes TEXT,
    official_website VARCHAR(1024),
    source_name VARCHAR(255),
    source_url VARCHAR(1024),
    verified BOOLEAN DEFAULT TRUE,
    last_verified_at VARCHAR(50) DEFAULT '2026-09-01'
);

-- 4. Temple Timings Table
CREATE TABLE IF NOT EXISTS temple_timings (
    id SERIAL PRIMARY KEY,
    temple_id INT REFERENCES temples(id) ON DELETE CASCADE,
    session_name VARCHAR(100) NOT NULL,
    opening_time VARCHAR(50) NOT NULL,
    closing_time VARCHAR(50) NOT NULL,
    notes VARCHAR(255)
);

-- 5. Temple Festivals Table
CREATE TABLE IF NOT EXISTS temple_festivals (
    id SERIAL PRIMARY KEY,
    temple_id INT REFERENCES temples(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    period VARCHAR(255) NOT NULL,
    significance TEXT NOT NULL
);

-- 6. Attractions Table
CREATE TABLE IF NOT EXISTS attractions (
    id SERIAL PRIMARY KEY,
    destination_id INT REFERENCES destinations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    distance_km FLOAT NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    image_url VARCHAR(1024),
    short_description TEXT NOT NULL,
    why_visit TEXT NOT NULL,
    best_time VARCHAR(100),
    estimated_time_minutes INT DEFAULT 60,
    wheelchair_friendly BOOLEAN DEFAULT FALSE,
    source_name VARCHAR(255),
    source_url VARCHAR(1024),
    verified BOOLEAN DEFAULT TRUE,
    last_verified_at VARCHAR(50) DEFAULT '2026-09-01'
);

-- 7. Hotels Table
CREATE TABLE IF NOT EXISTS hotels (
    id SERIAL PRIMARY KEY,
    destination_id INT REFERENCES destinations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    hotel_type VARCHAR(100) DEFAULT 'Hotel',
    distance_from_temple VARCHAR(100) NOT NULL,
    price_range VARCHAR(100) NOT NULL,
    rating FLOAT DEFAULT 4.2,
    address VARCHAR(500) NOT NULL,
    contact_phone VARCHAR(50),
    amenities JSON,
    wheelchair_accessible BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(1024),
    source_name VARCHAR(255),
    source_url VARCHAR(1024),
    verified BOOLEAN DEFAULT TRUE,
    last_verified_at VARCHAR(50) DEFAULT '2026-09-01'
);

-- 8. Restaurants Table
CREATE TABLE IF NOT EXISTS restaurants (
    id SERIAL PRIMARY KEY,
    destination_id INT REFERENCES destinations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    cuisine VARCHAR(255) DEFAULT 'Pure Vegetarian',
    price_for_two VARCHAR(100) DEFAULT '₹200 - ₹400',
    rating FLOAT DEFAULT 4.4,
    distance_from_temple VARCHAR(100) NOT NULL,
    address VARCHAR(500) NOT NULL,
    specialty_dish VARCHAR(255),
    is_pure_veg BOOLEAN DEFAULT TRUE,
    image_url VARCHAR(1024),
    source_name VARCHAR(255),
    source_url VARCHAR(1024),
    verified BOOLEAN DEFAULT TRUE,
    last_verified_at VARCHAR(50) DEFAULT '2026-09-01'
);

-- 9. Facilities Table
CREATE TABLE IF NOT EXISTS facilities (
    id SERIAL PRIMARY KEY,
    destination_id INT REFERENCES destinations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    location_details VARCHAR(500) NOT NULL,
    distance VARCHAR(100) NOT NULL,
    opening_hours VARCHAR(100) DEFAULT '24 Hours',
    is_free BOOLEAN DEFAULT TRUE,
    wheelchair_friendly BOOLEAN DEFAULT TRUE,
    source_name VARCHAR(255),
    source_url VARCHAR(1024),
    verified BOOLEAN DEFAULT TRUE,
    last_verified_at VARCHAR(50) DEFAULT '2026-09-01'
);

-- 10. Transport Points Table
CREATE TABLE IF NOT EXISTS transport_points (
    id SERIAL PRIMARY KEY,
    destination_id INT REFERENCES destinations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    point_type VARCHAR(100) NOT NULL,
    distance_km FLOAT NOT NULL,
    description TEXT,
    contact_phone VARCHAR(50),
    fare_estimate VARCHAR(100),
    senior_friendly BOOLEAN DEFAULT TRUE,
    source_name VARCHAR(255),
    source_url VARCHAR(1024),
    verified BOOLEAN DEFAULT TRUE,
    last_verified_at VARCHAR(50) DEFAULT '2026-09-01'
);

-- 11. Emergency Contacts Table
CREATE TABLE IF NOT EXISTS emergency_contacts (
    id SERIAL PRIMARY KEY,
    destination_id INT REFERENCES destinations(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(100) NOT NULL,
    alternate_phone VARCHAR(100),
    address VARCHAR(500) NOT NULL,
    priority INT DEFAULT 1,
    source_name VARCHAR(255) DEFAULT 'UP Police & District Administration Mirzapur',
    source_url VARCHAR(1024) DEFAULT 'https://mirzapur.nic.in',
    verified BOOLEAN DEFAULT TRUE,
    last_verified_at VARCHAR(50) DEFAULT '2026-09-01'
);

-- 12. Itineraries Table
CREATE TABLE IF NOT EXISTS itineraries (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    destination_name VARCHAR(255) NOT NULL,
    duration_days INT DEFAULT 1,
    travellers_count INT DEFAULT 1,
    has_elderly BOOLEAN DEFAULT FALSE,
    has_children BOOLEAN DEFAULT FALSE,
    accessibility_mode VARCHAR(100) DEFAULT 'Normal',
    budget FLOAT,
    notes TEXT,
    ai_generated BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. Itinerary Items Table
CREATE TABLE IF NOT EXISTS itinerary_items (
    id SERIAL PRIMARY KEY,
    itinerary_id INT REFERENCES itineraries(id) ON DELETE CASCADE,
    day_number INT DEFAULT 1,
    order_index INT DEFAULT 0,
    time_slot VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location_name VARCHAR(255),
    activity_type VARCHAR(100) DEFAULT 'Darshan',
    accessibility_tip VARCHAR(500)
);

-- 14. Saved Places Table
CREATE TABLE IF NOT EXISTS saved_places (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    place_type VARCHAR(50) NOT NULL,
    place_id INT NOT NULL,
    place_name VARCHAR(255) NOT NULL,
    place_image VARCHAR(1024),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 15. Sources Table
CREATE TABLE IF NOT EXISTS sources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(1024),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indices for rapid query performance
CREATE INDEX IF NOT EXISTS idx_destinations_slug ON destinations(slug);
CREATE INDEX IF NOT EXISTS idx_temples_dest ON temples(destination_id);
CREATE INDEX IF NOT EXISTS idx_attractions_dest ON attractions(destination_id);
CREATE INDEX IF NOT EXISTS idx_emergency_dest ON emergency_contacts(destination_id);
