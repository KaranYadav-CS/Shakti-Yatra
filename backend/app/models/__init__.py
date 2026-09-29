import datetime
from sqlalchemy import (
    Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey, JSON
)
from sqlalchemy.orm import relationship
from app.database import Base

class Source(Base):
    __tablename__ = "sources"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    url = Column(String(1024), nullable=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    itineraries = relationship("Itinerary", back_populates="user", cascade="all, delete-orphan")
    saved_places = relationship("SavedPlace", back_populates="user", cascade="all, delete-orphan")

class Destination(Base):
    __tablename__ = "destinations"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    tagline = Column(String(255), nullable=True)
    state = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    hero_image = Column(String(1024), nullable=True)
    gallery_images = Column(JSON, default=list)
    short_description = Column(Text, nullable=False)
    overview = Column(Text, nullable=False)
    significance = Column(Text, nullable=False)
    history = Column(Text, nullable=True)
    spiritual_story = Column(Text, nullable=True)
    best_time_to_visit = Column(String(255), nullable=True)
    nearest_railway = Column(String(255), nullable=True)
    nearest_airport = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    orbit_order = Column(Integer, default=0)
    
    # Verification metadata
    source_name = Column(String(255), default="UP Tourism / Vindhya Shrine Board")
    source_url = Column(String(1024), default="http://uptourism.gov.in")
    verified = Column(Boolean, default=True)
    last_verified_at = Column(String(50), default="2026-09-01")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    temples = relationship("Temple", back_populates="destination", cascade="all, delete-orphan")
    attractions = relationship("Attraction", back_populates="destination", cascade="all, delete-orphan")
    facilities = relationship("Facility", back_populates="destination", cascade="all, delete-orphan")
    hotels = relationship("Hotel", back_populates="destination", cascade="all, delete-orphan")
    restaurants = relationship("Restaurant", back_populates="destination", cascade="all, delete-orphan")
    transport_points = relationship("TransportPoint", back_populates="destination", cascade="all, delete-orphan")
    emergency_contacts = relationship("EmergencyContact", back_populates="destination", cascade="all, delete-orphan")

class Temple(Base):
    __tablename__ = "temples"

    id = Column(Integer, primary_key=True, index=True)
    destination_id = Column(Integer, ForeignKey("destinations.id"), nullable=False)
    name = Column(String(255), nullable=False)
    deity = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    significance = Column(Text, nullable=False)
    architecture = Column(Text, nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    image_url = Column(String(1024), nullable=True)
    audio_guide_url = Column(String(1024), nullable=True)
    dress_code = Column(String(255), default="Modest traditional attire recommended")
    entry_fee = Column(String(100), default="Free Entry (VIP darshan passes available officially)")
    wheelchair_accessible = Column(Boolean, default=False)
    accessibility_notes = Column(Text, nullable=True)
    official_website = Column(String(1024), nullable=True)
    
    # Verification
    source_name = Column(String(255), nullable=True)
    source_url = Column(String(1024), nullable=True)
    verified = Column(Boolean, default=True)
    last_verified_at = Column(String(50), default="2026-09-01")

    destination = relationship("Destination", back_populates="temples")
    timings = relationship("TempleTiming", back_populates="temple", cascade="all, delete-orphan")
    festivals = relationship("TempleFestival", back_populates="temple", cascade="all, delete-orphan")

class TempleTiming(Base):
    __tablename__ = "temple_timings"

    id = Column(Integer, primary_key=True, index=True)
    temple_id = Column(Integer, ForeignKey("temples.id"), nullable=False)
    session_name = Column(String(100), nullable=False) # e.g. Mangala Aarti, Bhog Aarti, Shayan Aarti
    opening_time = Column(String(50), nullable=False) # "04:00 AM"
    closing_time = Column(String(50), nullable=False) # "11:30 PM"
    notes = Column(String(255), nullable=True)

    temple = relationship("Temple", back_populates="timings")

class TempleFestival(Base):
    __tablename__ = "temple_festivals"

    id = Column(Integer, primary_key=True, index=True)
    temple_id = Column(Integer, ForeignKey("temples.id"), nullable=False)
    name = Column(String(255), nullable=False) # e.g. Chaitra Navratri, Ashwin Navratri, Kajali Mahotsav
    period = Column(String(255), nullable=False)
    significance = Column(Text, nullable=False)

    temple = relationship("Temple", back_populates="festivals")

class Attraction(Base):
    __tablename__ = "attractions"

    id = Column(Integer, primary_key=True, index=True)
    destination_id = Column(Integer, ForeignKey("destinations.id"), nullable=False)
    name = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False) # Nature, Spiritual, Waterfall, Ghat, Historic
    distance_km = Column(Float, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    image_url = Column(String(1024), nullable=True)
    short_description = Column(Text, nullable=False)
    why_visit = Column(Text, nullable=False)
    best_time = Column(String(100), nullable=True)
    estimated_time_minutes = Column(Integer, default=60)
    wheelchair_friendly = Column(Boolean, default=False)
    
    # Verification
    source_name = Column(String(255), nullable=True)
    source_url = Column(String(1024), nullable=True)
    verified = Column(Boolean, default=True)
    last_verified_at = Column(String(50), default="2026-09-01")

    destination = relationship("Destination", back_populates="attractions")

class Hotel(Base):
    __tablename__ = "hotels"

    id = Column(Integer, primary_key=True, index=True)
    destination_id = Column(Integer, ForeignKey("destinations.id"), nullable=False)
    name = Column(String(255), nullable=False)
    hotel_type = Column(String(100), default="Hotel") # Hotel, Dharamshala, Ashram, Guest House
    distance_from_temple = Column(String(100), nullable=False)
    price_range = Column(String(100), nullable=False) # ₹500 - ₹1,500
    rating = Column(Float, default=4.2)
    address = Column(String(500), nullable=False)
    contact_phone = Column(String(50), nullable=True)
    amenities = Column(JSON, default=list) # ["AC", "Hot Water", "Elevator", "Pure Veg"]
    wheelchair_accessible = Column(Boolean, default=False)
    image_url = Column(String(1024), nullable=True)
    
    # Verification
    source_name = Column(String(255), nullable=True)
    source_url = Column(String(1024), nullable=True)
    verified = Column(Boolean, default=True)
    last_verified_at = Column(String(50), default="2026-09-01")

    destination = relationship("Destination", back_populates="hotels")

class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)
    destination_id = Column(Integer, ForeignKey("destinations.id"), nullable=False)
    name = Column(String(255), nullable=False)
    cuisine = Column(String(255), default="Pure Vegetarian North Indian / Sattvik Prasadam")
    price_for_two = Column(String(100), default="₹200 - ₹400")
    rating = Column(Float, default=4.4)
    distance_from_temple = Column(String(100), nullable=False)
    address = Column(String(500), nullable=False)
    specialty_dish = Column(String(255), default="Poori Sabzi, Malpua, Lassi, Peda")
    is_pure_veg = Column(Boolean, default=True)
    image_url = Column(String(1024), nullable=True)
    
    # Verification
    source_name = Column(String(255), nullable=True)
    source_url = Column(String(1024), nullable=True)
    verified = Column(Boolean, default=True)
    last_verified_at = Column(String(50), default="2026-09-01")

    destination = relationship("Destination", back_populates="restaurants")

class Facility(Base):
    __tablename__ = "facilities"

    id = Column(Integer, primary_key=True, index=True)
    destination_id = Column(Integer, ForeignKey("destinations.id"), nullable=False)
    name = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False) # Medical, ATM, Washroom, Cloakroom, Drinking Water, Shoe Stand
    location_details = Column(String(500), nullable=False)
    distance = Column(String(100), nullable=False)
    opening_hours = Column(String(100), default="24 Hours or 6 AM - 10 PM")
    is_free = Column(Boolean, default=True)
    wheelchair_friendly = Column(Boolean, default=True)
    
    # Verification
    source_name = Column(String(255), nullable=True)
    source_url = Column(String(1024), nullable=True)
    verified = Column(Boolean, default=True)
    last_verified_at = Column(String(50), default="2026-09-01")

    destination = relationship("Destination", back_populates="facilities")

class TransportPoint(Base):
    __tablename__ = "transport_points"

    id = Column(Integer, primary_key=True, index=True)
    destination_id = Column(Integer, ForeignKey("destinations.id"), nullable=False)
    name = Column(String(255), nullable=False)
    point_type = Column(String(100), nullable=False) # Railway Station, Bus Stand, Auto Stand, Ropeway, Parking
    distance_km = Column(Float, nullable=False)
    description = Column(Text, nullable=True)
    contact_phone = Column(String(50), nullable=True)
    fare_estimate = Column(String(100), nullable=True)
    senior_friendly = Column(Boolean, default=True)
    
    # Verification
    source_name = Column(String(255), nullable=True)
    source_url = Column(String(1024), nullable=True)
    verified = Column(Boolean, default=True)
    last_verified_at = Column(String(50), default="2026-09-01")

    destination = relationship("Destination", back_populates="transport_points")

class EmergencyContact(Base):
    __tablename__ = "emergency_contacts"

    id = Column(Integer, primary_key=True, index=True)
    destination_id = Column(Integer, ForeignKey("destinations.id"), nullable=False)
    category = Column(String(100), nullable=False) # Police, Ambulance, Hospital, Temple Trust, Women Helpline, Disaster
    service_name = Column(String(255), nullable=False)
    phone_number = Column(String(100), nullable=False)
    alternate_phone = Column(String(100), nullable=True)
    address = Column(String(500), nullable=False)
    priority = Column(Integer, default=1)
    
    # Verification
    source_name = Column(String(255), default="UP Police & District Administration Mirzapur")
    source_url = Column(String(1024), default="https://mirzapur.nic.in")
    verified = Column(Boolean, default=True)
    last_verified_at = Column(String(50), default="2026-09-01")

    destination = relationship("Destination", back_populates="emergency_contacts")

class Itinerary(Base):
    __tablename__ = "itineraries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Nullable for guest itineraries
    title = Column(String(255), nullable=False)
    destination_name = Column(String(255), nullable=False)
    duration_days = Column(Integer, default=1)
    travellers_count = Column(Integer, default=1)
    has_elderly = Column(Boolean, default=False)
    has_children = Column(Boolean, default=False)
    accessibility_mode = Column(String(100), default="Normal") # Normal, Senior, Wheelchair, Family
    budget = Column(Float, nullable=True)
    notes = Column(Text, nullable=True)
    ai_generated = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="itineraries")
    items = relationship("ItineraryItem", back_populates="itinerary", cascade="all, delete-orphan")

class ItineraryItem(Base):
    __tablename__ = "itinerary_items"

    id = Column(Integer, primary_key=True, index=True)
    itinerary_id = Column(Integer, ForeignKey("itineraries.id"), nullable=False)
    day_number = Column(Integer, default=1)
    order_index = Column(Integer, default=0)
    time_slot = Column(String(50), nullable=False) # "06:00 AM - 08:00 AM"
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    location_name = Column(String(255), nullable=True)
    activity_type = Column(String(100), default="Darshan") # Darshan, Food, Travel, Rest, Sightseeing
    accessibility_tip = Column(String(500), nullable=True)

    itinerary = relationship("Itinerary", back_populates="items")

class SavedPlace(Base):
    __tablename__ = "saved_places"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    place_type = Column(String(50), nullable=False) # temple, attraction, hotel, restaurant
    place_id = Column(Integer, nullable=False)
    place_name = Column(String(255), nullable=False)
    place_image = Column(String(1024), nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="saved_places")
