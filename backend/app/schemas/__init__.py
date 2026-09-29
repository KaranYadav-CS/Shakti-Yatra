from typing import List, Optional, Any
from pydantic import BaseModel, EmailStr

# Base Verified Fields
class VerifiedItemMixin(BaseModel):
    source_name: Optional[str] = None
    source_url: Optional[str] = None
    verified: bool = True
    last_verified_at: Optional[str] = None

# Temple Timings & Festivals
class TempleTimingSchema(BaseModel):
    id: int
    session_name: str
    opening_time: str
    closing_time: str
    notes: Optional[str] = None

    class Config:
        from_attributes = True

class TempleFestivalSchema(BaseModel):
    id: int
    name: str
    period: str
    significance: str

    class Config:
        from_attributes = True

# Temple Schemas
class TempleSchema(VerifiedItemMixin):
    id: int
    destination_id: int
    name: str
    deity: str
    description: str
    significance: str
    architecture: Optional[str] = None
    latitude: float
    longitude: float
    image_url: Optional[str] = None
    audio_guide_url: Optional[str] = None
    dress_code: Optional[str] = None
    entry_fee: Optional[str] = None
    wheelchair_accessible: bool = False
    accessibility_notes: Optional[str] = None
    official_website: Optional[str] = None
    timings: List[TempleTimingSchema] = []
    festivals: List[TempleFestivalSchema] = []

    class Config:
        from_attributes = True

# Attractions
class AttractionSchema(VerifiedItemMixin):
    id: int
    destination_id: int
    name: str
    category: str
    distance_km: float
    latitude: float
    longitude: float
    image_url: Optional[str] = None
    short_description: str
    why_visit: str
    best_time: Optional[str] = None
    estimated_time_minutes: int
    wheelchair_friendly: bool

    class Config:
        from_attributes = True

# Hotels
class HotelSchema(VerifiedItemMixin):
    id: int
    destination_id: int
    name: str
    hotel_type: str
    distance_from_temple: str
    price_range: str
    rating: float
    address: str
    contact_phone: Optional[str] = None
    amenities: List[str] = []
    wheelchair_accessible: bool
    image_url: Optional[str] = None

    class Config:
        from_attributes = True

# Restaurants
class RestaurantSchema(VerifiedItemMixin):
    id: int
    destination_id: int
    name: str
    cuisine: str
    price_for_two: str
    rating: float
    distance_from_temple: str
    address: str
    specialty_dish: str
    is_pure_veg: bool
    image_url: Optional[str] = None

    class Config:
        from_attributes = True

# Facilities
class FacilitySchema(VerifiedItemMixin):
    id: int
    destination_id: int
    name: str
    category: str
    location_details: str
    distance: str
    opening_hours: str
    is_free: bool
    wheelchair_friendly: bool

    class Config:
        from_attributes = True

# Transport Points
class TransportPointSchema(VerifiedItemMixin):
    id: int
    destination_id: int
    name: str
    point_type: str
    distance_km: float
    description: Optional[str] = None
    contact_phone: Optional[str] = None
    fare_estimate: Optional[str] = None
    senior_friendly: bool

    class Config:
        from_attributes = True

# Emergency Contacts
class EmergencyContactSchema(VerifiedItemMixin):
    id: int
    destination_id: int
    category: str
    service_name: str
    phone_number: str
    alternate_phone: Optional[str] = None
    address: str
    priority: int

    class Config:
        from_attributes = True

# Destination Schemas
class DestinationSummarySchema(VerifiedItemMixin):
    id: int
    slug: str
    name: str
    tagline: Optional[str] = None
    state: str
    district: str
    latitude: float
    longitude: float
    hero_image: Optional[str] = None
    short_description: str
    best_time_to_visit: Optional[str] = None
    is_active: bool
    orbit_order: int

    class Config:
        from_attributes = True

class DestinationDetailSchema(DestinationSummarySchema):
    overview: str
    significance: str
    history: Optional[str] = None
    spiritual_story: Optional[str] = None
    nearest_railway: Optional[str] = None
    nearest_airport: Optional[str] = None
    gallery_images: List[str] = []
    temples: List[TempleSchema] = []
    attractions: List[AttractionSchema] = []
    hotels: List[HotelSchema] = []
    restaurants: List[RestaurantSchema] = []
    facilities: List[FacilitySchema] = []
    transport_points: List[TransportPointSchema] = []
    emergency_contacts: List[EmergencyContactSchema] = []

    class Config:
        from_attributes = True

# Itinerary Schemas
class ItineraryItemSchema(BaseModel):
    id: Optional[int] = None
    day_number: int
    order_index: int
    time_slot: str
    title: str
    description: str
    location_name: Optional[str] = None
    activity_type: str
    accessibility_tip: Optional[str] = None

    class Config:
        from_attributes = True

class ItineraryCreateRequest(BaseModel):
    destination: str = "Vindhyachal"
    duration_days: int = 1
    travellers_count: int = 1
    has_elderly: bool = False
    has_children: bool = False
    accessibility_mode: str = "Normal" # Normal, Senior, Wheelchair, Family
    budget_level: Optional[str] = "Standard" # Budget, Standard, Premium
    preferred_activities: List[str] = ["Darshan", "Aarti", "Temple Walk", "Sightseeing"]

class ItineraryResponseSchema(BaseModel):
    id: Optional[int] = None
    title: str
    destination_name: str
    duration_days: int
    travellers_count: int
    has_elderly: bool
    has_children: bool
    accessibility_mode: str
    budget: Optional[float] = None
    notes: Optional[str] = None
    ai_generated: bool
    items: List[ItineraryItemSchema] = []

    class Config:
        from_attributes = True

# AI Assistant Schemas
class AssistantMessageSchema(BaseModel):
    role: str # "user" | "assistant"
    content: str

class AssistantChatRequest(BaseModel):
    message: str
    conversation_history: List[AssistantMessageSchema] = []
    accessibility_mode: Optional[str] = "Normal"
    destination: Optional[str] = "Vindhyachal"

class AssistantChatResponse(BaseModel):
    reply: str
    sources: List[str] = []
    suggested_actions: List[str] = []
    is_verified_knowledge: bool = True

# Search Schemas
class SearchResultItem(BaseModel):
    id: int
    type: str # destination, temple, attraction, hotel, restaurant, facility
    title: str
    subtitle: str
    category: Optional[str] = None
    url: str
    image_url: Optional[str] = None
    verified: bool = True

class SearchResponseSchema(BaseModel):
    query: str
    count: int
    results: List[SearchResultItem]

# Auth Schemas
class UserRegisterSchema(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str

class UserResponseSchema(BaseModel):
    id: int
    name: str
    email: str
    is_admin: bool

    class Config:
        from_attributes = True

class TokenResponseSchema(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponseSchema

# Saved Place Schemas
class SavedPlaceCreate(BaseModel):
    place_type: str
    place_id: int
    place_name: str
    place_image: Optional[str] = None
    notes: Optional[str] = None

class SavedPlaceSchema(SavedPlaceCreate):
    id: int
    created_at: Any

    class Config:
        from_attributes = True

# Admin Schemas
class AdminStatsSchema(BaseModel):
    total_destinations: int
    total_temples: int
    total_attractions: int
    total_services: int
    total_emergency_contacts: int
    pending_verification_count: int
    verified_percentage: float

class VerificationUpdateRequest(BaseModel):
    entity_type: str # temple, attraction, hotel, restaurant, emergency, destination
    entity_id: int
    verified: bool
    source_name: Optional[str] = None
    source_url: Optional[str] = None
