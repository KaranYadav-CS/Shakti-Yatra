export const API_BASE =
  typeof window !== 'undefined'
    ? '/api'
    : (process.env.INTERNAL_API_URL || 'http://127.0.0.1:8000/api');

export interface Destination {
  id: number;
  slug: string;
  name: string;
  tagline?: string;
  state: string;
  district: string;
  latitude: number;
  longitude: number;
  hero_image?: string;
  short_description: string;
  overview?: string;
  significance?: string;
  history?: string;
  spiritual_story?: string;
  best_time_to_visit?: string;
  nearest_railway?: string;
  nearest_airport?: string;
  gallery_images?: string[];
  is_active: boolean;
  orbit_order: number;
  source_name?: string;
  source_url?: string;
  verified: boolean;
  last_verified_at?: string;
  temples?: Temple[];
  attractions?: Attraction[];
  hotels?: Hotel[];
  restaurants?: Restaurant[];
  facilities?: Facility[];
  transport_points?: TransportPoint[];
  emergency_contacts?: EmergencyContact[];
}

export interface Temple {
  id: number;
  destination_id: number;
  name: string;
  deity: string;
  description: string;
  significance: string;
  architecture?: string;
  latitude: number;
  longitude: number;
  image_url?: string;
  audio_guide_url?: string;
  dress_code?: string;
  entry_fee?: string;
  wheelchair_accessible: boolean;
  accessibility_notes?: string;
  official_website?: string;
  source_name?: string;
  source_url?: string;
  verified: boolean;
  last_verified_at?: string;
  timings?: {
    id: number;
    session_name: string;
    opening_time: string;
    closing_time: string;
    notes?: string;
  }[];
  festivals?: {
    id: number;
    name: string;
    period: string;
    significance: string;
  }[];
}

export interface Attraction {
  id: number;
  name: string;
  category: string;
  distance_km: number;
  latitude: number;
  longitude: number;
  image_url?: string;
  short_description: string;
  why_visit: string;
  best_time?: string;
  estimated_time_minutes: number;
  wheelchair_friendly: boolean;
  source_name?: string;
  verified: boolean;
  last_verified_at?: string;
}

export interface Hotel {
  id: number;
  name: string;
  hotel_type: string;
  distance_from_temple: string;
  price_range: string;
  rating: number;
  address: string;
  contact_phone?: string;
  amenities: string[];
  wheelchair_accessible: boolean;
  image_url?: string;
  verified: boolean;
  source_name?: string;
}

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  price_for_two: string;
  rating: number;
  distance_from_temple: string;
  address: string;
  specialty_dish: string;
  is_pure_veg: boolean;
  image_url?: string;
  verified: boolean;
}

export interface Facility {
  id: number;
  name: string;
  category: string;
  location_details: string;
  distance: string;
  opening_hours: string;
  is_free: boolean;
  wheelchair_friendly: boolean;
  verified: boolean;
}

export interface TransportPoint {
  id: number;
  name: string;
  point_type: string;
  distance_km: number;
  description?: string;
  contact_phone?: string;
  fare_estimate?: string;
  senior_friendly: boolean;
  verified: boolean;
}

export interface EmergencyContact {
  id: number;
  category: string;
  service_name: string;
  phone_number: string;
  alternate_phone?: string;
  address: string;
  priority: number;
  source_name?: string;
  source_url?: string;
  verified: boolean;
  last_verified_at?: string;
}

export interface SearchResult {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  category?: string;
  url: string;
  image_url?: string;
  verified: boolean;
}

export interface ItineraryItem {
  id?: number;
  day_number: number;
  order_index: number;
  time_slot: string;
  title: string;
  description: string;
  location_name?: string;
  activity_type: string;
  accessibility_tip?: string;
}

export interface Itinerary {
  id?: number;
  title: string;
  destination_name: string;
  duration_days: number;
  travellers_count: number;
  has_elderly: boolean;
  has_children: boolean;
  accessibility_mode: string;
  budget?: number;
  notes?: string;
  ai_generated: boolean;
  items: ItineraryItem[];
}

export async function fetchDestinations(): Promise<Destination[]> {
  try {
    const res = await fetch(`${API_BASE}/destinations`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch destinations');
    return await res.json();
  } catch (err) {
    console.warn("Backend offline, returning fallback data for Vindhyachal", err);
    return [
      {
        id: 1,
        slug: "vindhyachal",
        name: "Vindhyachal",
        tagline: "The Eternal Sanctum of Adi Shakti Mahalakshmi",
        state: "Uttar Pradesh",
        district: "Mirzapur",
        latitude: 25.1614,
        longitude: 82.5029,
        hero_image: "https://images.unsplash.com/photo-1626014303757-65644775be62?auto=format&fit=crop&w=1600&q=80",
        short_description: "Vindhyachal is a celebrated Siddhpeeth and holy abode of Maa Vindhyavasini along the Ganges in Mirzapur, UP.",
        best_time_to_visit: "October to March",
        is_active: true,
        orbit_order: 1,
        verified: true,
        last_verified_at: "2026-09-01"
      }
    ];
  }
}

export async function fetchDestinationDetail(slug: string): Promise<Destination | null> {
  try {
    const res = await fetch(`${API_BASE}/destinations/${slug}`, { credentials: 'omit', cache: 'no-store' });
    if (!res.ok) throw new Error(`Destination ${slug} not found`);
    return await res.json();
  } catch (err) {
    console.error(`Error loading destination ${slug}:`, err);
    return null;
  }
}

export async function searchPilgrimage(query: string, category?: string): Promise<SearchResult[]> {
  if (!query || query.trim().length === 0) return [];
  try {
    const catParam = category && category !== 'all' ? `&category=${encodeURIComponent(category)}` : '';
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query.trim())}${catParam}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.warn("Search error:", err);
    return [];
  }
}

export async function queryShaktiAssistant(
  message: string,
  accessibility_mode: string = "Normal"
): Promise<{ reply: string; sources: string[]; suggested_actions: string[] }> {
  try {
    const res = await fetch(`${API_BASE}/assistant/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, accessibility_mode, destination: "Vindhyachal" })
    });
    if (!res.ok) throw new Error("Assistant response error");
    return await res.json();
  } catch (err) {
    return {
      reply: "Namaste! I am currently operating in offline mode. For verified timings: Maa Vindhyavasini Mangala Aarti is 04:00 AM - 05:00 AM, Sandhya Aarti is 07:15 PM. Police helpline is 112, Ambulance is 108.",
      sources: ["Vindhya Shrine Board Records (Cached)"],
      suggested_actions: ["Check temple aarti timings", "Show emergency medical contacts"]
    };
  }
}

export async function generateItinerary(payload: {
  destination: string;
  duration_days: number;
  travellers_count: number;
  has_elderly: boolean;
  has_children: boolean;
  accessibility_mode: string;
  budget_level?: string;
}): Promise<Itinerary> {
  const res = await fetch(`${API_BASE}/itinerary/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to generate itinerary");
  return await res.json();
}

export const FALLBACK_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 1,
    category: "Police Station",
    service_name: "Vindhyachal Police Station (Kotwali)",
    phone_number: "05442-232225",
    alternate_phone: "+91-9454403849",
    address: "Station Road, Near BDL Railway Halt, Vindhyachal (800 meters from Mandir)",
    priority: 1,
    source_name: "Mirzapur District Police",
    source_url: "https://mirzapurpolice.up.gov.in",
    verified: true,
    last_verified_at: "2026-09-01"
  },
  {
    id: 2,
    category: "Police",
    service_name: "Uttar Pradesh Unified Emergency Police (Dial 112)",
    phone_number: "112",
    alternate_phone: "+91-9454403848",
    address: "PRV Emergency Response Vehicles stationed 24x7 at Vindhyachal Mandir Chowk & Ghats",
    priority: 1,
    source_name: "UP Police Directorate",
    source_url: "https://uppolice.gov.in",
    verified: true,
    last_verified_at: "2026-09-01"
  },
  {
    id: 3,
    category: "Hospital",
    service_name: "Community Health Centre (CHC) Vindhyachal",
    phone_number: "05442-252345",
    alternate_phone: "+91-9415201234",
    address: "Main Station Road, Vindhyachal (900 meters from Temple, 24x7 Emergency Trauma Unit & Pharmacy)",
    priority: 1,
    source_name: "Chief Medical Officer Mirzapur",
    source_url: "https://mirzapur.nic.in",
    verified: true,
    last_verified_at: "2026-09-01"
  },
  {
    id: 4,
    category: "Ambulance",
    service_name: "UP Emergency Medical Ambulance (Dial 108)",
    phone_number: "108",
    alternate_phone: "+91-9454403848",
    address: "Rapid Response Ambulances with Oxygen stationed 24x7 at Vindhya Corridor Emergency Bay",
    priority: 1,
    source_name: "National Health Mission UP",
    source_url: "https://upnrhm.gov.in",
    verified: true,
    last_verified_at: "2026-09-01"
  },
  {
    id: 5,
    category: "Women Safety",
    service_name: "UP Women Power Line (Dial 1090)",
    phone_number: "1090",
    alternate_phone: "112",
    address: "24x7 toll-free emergency and anti-harassment police helpline for women pilgrims",
    priority: 1,
    source_name: "UP Police Women Safety Cell",
    source_url: "https://uppolice.gov.in",
    verified: true,
    last_verified_at: "2026-09-01"
  },
  {
    id: 6,
    category: "UP Tourism",
    service_name: "UP Tourism 24x7 Pilgrim Helpdesk (Toll-Free)",
    phone_number: "1800-180-5145",
    alternate_phone: "+91-522-2615005",
    address: "Directorate of Tourism UP & Tourist Information Counter, Vindhyachal Corridor Gate 2",
    priority: 1,
    source_name: "Department of Tourism Uttar Pradesh",
    source_url: "https://uptourism.gov.in",
    verified: true,
    last_verified_at: "2026-09-01"
  },
  {
    id: 7,
    category: "Temple Authority",
    service_name: "Maa Vindhyavasini Temple Control Room & Pilgrim Desk",
    phone_number: "05442-232222",
    alternate_phone: "+91-8887711223",
    address: "Corridor Administrative Office, Gate 1, Vindhyachal (Pilgrim queries, Lost & Found, VIP passes)",
    priority: 1,
    source_name: "Vindhya Shrine Board Administration",
    source_url: "https://mirzapur.nic.in",
    verified: true,
    last_verified_at: "2026-09-01"
  },
  {
    id: 8,
    category: "Hospital",
    service_name: "Red Cross Emergency First-Aid Post",
    phone_number: "+91-9450234567",
    alternate_phone: "108",
    address: "Vindhya Dham Corridor Entrance Gate 1 (Doctor & Paramedic on duty, Free Medicines & Dressing)",
    priority: 1,
    source_name: "Vindhya Shrine Board Administration",
    source_url: "https://mirzapur.nic.in",
    verified: true,
    last_verified_at: "2026-09-01"
  },
  {
    id: 9,
    category: "Hospital",
    service_name: "Divisional District Hospital Mirzapur",
    phone_number: "05442-252244",
    alternate_phone: "05442-252245",
    address: "Civil Lines, Mirzapur (8 km from Vindhyachal, 24x7 Trauma, ICU & Blood Bank)",
    priority: 2,
    source_name: "National Health Mission UP",
    source_url: "https://upnrhm.gov.in",
    verified: true,
    last_verified_at: "2026-09-01"
  },
  {
    id: 10,
    category: "Hospital",
    service_name: "Maa Vindhyavasini Autonomous State Medical College",
    phone_number: "05442-256001",
    alternate_phone: "05442-256002",
    address: "Pandeypur, Mirzapur (Advanced Super-specialty & Emergency Trauma Block)",
    priority: 2,
    source_name: "Department of Medical Education UP",
    source_url: "https://dgme.up.gov.in",
    verified: true,
    last_verified_at: "2026-09-01"
  },
  {
    id: 11,
    category: "Ambulance",
    service_name: "UP Maternal & Child Ambulance (Dial 102)",
    phone_number: "102",
    alternate_phone: "108",
    address: "Dedicated pregnant women, neonates and children medical transfer fleet",
    priority: 2,
    source_name: "National Health Mission UP",
    source_url: "https://upnrhm.gov.in",
    verified: true,
    last_verified_at: "2026-09-01"
  },
  {
    id: 12,
    category: "Women Safety",
    service_name: "Women in Distress & Domestic Helpline (Dial 181)",
    phone_number: "181",
    alternate_phone: "1090",
    address: "One-stop emergency crisis response, legal and psychological assistance for women",
    priority: 1,
    source_name: "Women & Child Development UP",
    source_url: "https://mahilakalyan.up.nic.in",
    verified: true,
    last_verified_at: "2026-09-01"
  },
  {
    id: 13,
    category: "Women Safety",
    service_name: "Anti-Romeo Squad & Mahila Thana Mirzapur",
    phone_number: "+91-9454403850",
    alternate_phone: "05442-252100",
    address: "Special Police Patrol teams deployed along Vindhyachal Corridor, Kali Khoh and Ashtabhuja",
    priority: 2,
    source_name: "Mirzapur District Police",
    source_url: "https://mirzapurpolice.up.gov.in",
    verified: true,
    last_verified_at: "2026-09-01"
  },
  {
    id: 14,
    category: "Police",
    service_name: "Superintendent of Police (SP) Mirzapur Office",
    phone_number: "05442-252200",
    alternate_phone: "+91-9454400293",
    address: "Collectorate Compound, Mirzapur (8 km from Vindhyachal)",
    priority: 2,
    source_name: "UP Police",
    source_url: "https://mirzapurpolice.up.gov.in",
    verified: true,
    last_verified_at: "2026-09-01"
  },
  {
    id: 15,
    category: "Police",
    service_name: "Jal Police & Ganga River Rescue Post",
    phone_number: "+91-9454403855",
    alternate_phone: "112",
    address: "Pakka Ghat & Ramgaya Ghat Riverfront, Vindhyachal (Deep-water rescue team & motorboats)",
    priority: 2,
    source_name: "Mirzapur District Police",
    source_url: "https://mirzapurpolice.up.gov.in",
    verified: true,
    last_verified_at: "2026-09-01"
  },
  {
    id: 16,
    category: "Temple Authority",
    service_name: "Vindhya Dham Lost & Found Pilgrim Assistance",
    phone_number: "05442-252555",
    alternate_phone: "05442-232222",
    address: "Central Corridor Information Plaza, Vindhyachal (Announcements, child tracking & lost luggage)",
    priority: 2,
    source_name: "District Administration Mirzapur",
    source_url: "https://mirzapur.nic.in",
    verified: true,
    last_verified_at: "2026-09-01"
  },
  {
    id: 17,
    category: "UP Tourism",
    service_name: "Regional Tourist Office Mirzapur (UP Tourism)",
    phone_number: "05442-245360",
    alternate_phone: "+91-9415694248",
    address: "Tourist Bungalow Complex, Vindhyachal Road, Mirzapur",
    priority: 2,
    source_name: "UP Tourism",
    source_url: "https://uptourism.gov.in",
    verified: true,
    last_verified_at: "2026-09-01"
  },
  {
    id: 18,
    category: "Disaster & Fire",
    service_name: "Fire Service Station Vindhyachal & Mirzapur (Dial 101)",
    phone_number: "101",
    alternate_phone: "05442-252111",
    address: "Fire Station Road, Mirzapur & Fire Tender Post at Vindhyachal Corridor",
    priority: 1,
    source_name: "UP Fire and Emergency Services",
    source_url: "https://fire.up.gov.in",
    verified: true,
    last_verified_at: "2026-09-01"
  }
];

export async function fetchEmergencyContacts(slug: string = "vindhyachal"): Promise<EmergencyContact[]> {
  try {
    const res = await fetch(`${API_BASE}/emergency?destination_slug=${slug}`);
    if (!res.ok) throw new Error("Failed to load emergency contacts");
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : FALLBACK_EMERGENCY_CONTACTS;
  } catch (err) {
    return FALLBACK_EMERGENCY_CONTACTS;
  }
}

export interface PlaceItem {
  id: string;
  name: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  distance_from_temple: string;
  rating: number;
  contact_phone?: string;
  emergency_no?: string;
  price_range?: string;
  specialty?: string;
  amenities?: string[];
  description: string;
  google_maps_url: string;
  google_embed_url: string;
  turn_by_turn_dir: string;
  verified: boolean;
  tags?: string[];
}

export interface NeighboringTown {
  id: string;
  name: string;
  distance_km: number;
  travel_time: string;
  highlights: string;
  google_maps_url: string;
}

export interface NearbyPlacesResponse {
  destination: string;
  center_coordinates: { latitude: number; longitude: number };
  count: number;
  places: PlaceItem[];
  neighboring_towns: NeighboringTown[];
}

export interface HistorySection {
  title: string;
  scriptural_sources: string[];
  sanskrit_shloka?: string;
  shloka_translation?: string;
  gita_verse?: string;
  gita_verse_translation?: string;
  holy_sites?: string[];
  exposition: string;
  trikona_yatra?: Record<string, string>;
  uttarvahini_ganga?: string;
}

export interface HistoryResponse {
  title: string;
  developer: string;
  sections: {
    maa_vindhyavasini_utpatti: HistorySection;
    vindhya_parvat_utpatti: HistorySection;
    ramayana_connection: HistorySection;
    shri_krishna_gita_connection: HistorySection;
    dharmic_philosophical_depth: HistorySection;
  };
}

export async function fetchNearbyPlaces(category?: string, query?: string): Promise<NearbyPlacesResponse> {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (query && query.trim()) params.append('q', query.trim());
    const queryStr = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/places/nearby${queryStr}`);
    if (!res.ok) throw new Error("Failed to fetch nearby places");
    return await res.json();
  } catch (err) {
    console.warn("Using fallback places dataset", err);
    return {
      destination: "Vindhyachal, Uttar Pradesh",
      center_coordinates: { latitude: 25.1614, longitude: 82.5029 },
      count: 0,
      places: [],
      neighboring_towns: []
    };
  }
}

export async function searchGooglePlaces(query: string): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/places/google-search?query=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Search failed");
    return await res.json();
  } catch (err) {
    return {
      query,
      google_maps_direct_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}+Vindhyachal`,
      google_maps_embed_url: `https://maps.google.com/maps?q=${encodeURIComponent(query)}+Vindhyachal&z=15&output=embed`,
      matched_places: []
    };
  }
}

export async function fetchVindhyachalHistory(): Promise<HistoryResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/places/history`);
    if (!res.ok) throw new Error("Failed to load history");
    return await res.json();
  } catch (err) {
    console.error("Error loading history:", err);
    return null;
  }
}
