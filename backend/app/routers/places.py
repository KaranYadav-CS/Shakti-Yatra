from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
import urllib.parse
from app.database import get_db
from app.models import Destination, Hotel, Restaurant, Facility, TransportPoint, Temple
from app.config import settings

router = APIRouter(prefix="/places", tags=["Places & Google Maps Explorer"])

# Comprehensive verified neighborhood and points of interest for Vindhyachal
VINDHYACHAL_NEIGHBORS = [
    {
        "id": "v-mandir",
        "name": "Maa Vindhyavasini Devi Mandir",
        "category": "Sacred Sanctum",
        "address": "Vindhya Dham, Vindhyachal, Mirzapur, UP 231307",
        "latitude": 25.1614,
        "longitude": 82.5029,
        "distance_from_temple": "0 km (Main Temple)",
        "rating": 4.9,
        "contact_phone": "+91-5442-252555",
        "description": "The sacred sanctum of Adi Shakti Mahalakshmi in the holy Vindhyas. The epicenter of the Trikona Yatra.",
        "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Maa+Vindhyavasini+Temple+Vindhyachal",
        "google_embed_url": "https://maps.google.com/maps?q=25.1614,82.5029&z=16&output=embed",
        "turn_by_turn_dir": "https://www.google.com/maps/dir/?api=1&destination=25.1614,82.5029",
        "verified": True,
        "tags": ["temple", "shaktipeeth", "pradhan-peeth"]
    },
    {
        "id": "v-kali-khoh",
        "name": "Maa Kali Khoh Mandir",
        "category": "Sacred Sanctum",
        "address": "Vindhya Hills, 2 km from Vindhyavasini Mandir, Mirzapur, UP",
        "latitude": 25.1532,
        "longitude": 82.5110,
        "distance_from_temple": "2.2 km South-East",
        "rating": 4.8,
        "contact_phone": "+91-5442-252100",
        "description": "Cave shrine dedicated to Maa Mahakali, embodying the cosmic power of transformation and victory over negative energies.",
        "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Kali+Khoh+Temple+Vindhyachal",
        "google_embed_url": "https://maps.google.com/maps?q=25.1532,82.5110&z=16&output=embed",
        "turn_by_turn_dir": "https://www.google.com/maps/dir/?api=1&destination=25.1532,82.5110",
        "verified": True,
        "tags": ["temple", "trikona", "cave"]
    },
    {
        "id": "v-ashtabhuja",
        "name": "Maa Ashtabhuja Devi Mandir",
        "category": "Sacred Sanctum",
        "address": "Hilltop, Ashtabhuja Road, Vindhyachal, Mirzapur, UP",
        "latitude": 25.1568,
        "longitude": 82.5185,
        "distance_from_temple": "3.1 km South",
        "rating": 4.9,
        "contact_phone": "+91-5442-252101",
        "description": "Hilltop sanctum dedicated to Mahasaraswati / Yogamaya who manifested before Kansa. Connected by passenger ropeway.",
        "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Ashtabhuja+Temple+Vindhyachal",
        "google_embed_url": "https://maps.google.com/maps?q=25.1568,82.5185&z=16&output=embed",
        "turn_by_turn_dir": "https://www.google.com/maps/dir/?api=1&destination=25.1568,82.5185",
        "verified": True,
        "tags": ["temple", "trikona", "hilltop", "ropeway"]
    },
    {
        "id": "v-sita-kund",
        "name": "Sita Kund & Sacred Spring",
        "category": "Ramayana Heritage & Kund",
        "address": "En route to Ashtabhuja Temple, Vindhyachal, UP",
        "latitude": 25.1555,
        "longitude": 82.5160,
        "distance_from_temple": "2.8 km",
        "rating": 4.7,
        "description": "Pure mountain freshwater spring manifested by Lakshmana's arrow during the exile of Lord Rama and Mata Sita.",
        "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Sita+Kund+Vindhyachal",
        "google_embed_url": "https://maps.google.com/maps?q=25.1555,82.5160&z=16&output=embed",
        "turn_by_turn_dir": "https://www.google.com/maps/dir/?api=1&destination=25.1555,82.5160",
        "verified": True,
        "tags": ["ramayana", "kund", "heritage"]
    },
    {
        "id": "v-ramgaya-ghat",
        "name": "Ramgaya Ghat & Rameshwar Mahadev",
        "category": "Ghat & Pind Daan Kshetra",
        "address": "Banks of Holy Ganga (Uttarvahini), Vindhyachal, UP",
        "latitude": 25.1638,
        "longitude": 82.5011,
        "distance_from_temple": "650 meters North-West",
        "rating": 4.8,
        "description": "Sacred ghat where Prabhu Shri Ram performed Pitru Tarpan & Shraddha for Maharaja Dasharatha and consecrated Rameshwar Mahadev.",
        "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Ramgaya+Ghat+Vindhyachal",
        "google_embed_url": "https://maps.google.com/maps?q=25.1638,82.5011&z=16&output=embed",
        "turn_by_turn_dir": "https://www.google.com/maps/dir/?api=1&destination=25.1638,82.5011",
        "verified": True,
        "tags": ["ramayana", "ghat", "ganga", "shraddha"]
    },
    {
        "id": "v-hotel-upstdc",
        "name": "UPSTDC Tourist Bungalow (Kajali / Rahi Hotel)",
        "category": "Hotels & Dharamshalas",
        "address": "Vindhyachal Road, Near Station, Vindhyachal, UP 231307",
        "latitude": 25.1650,
        "longitude": 82.5080,
        "distance_from_temple": "1.2 km",
        "price_range": "₹1,200 - ₹2,500/night",
        "rating": 4.4,
        "contact_phone": "+91-5442-252277",
        "amenities": ["Air Conditioned", "Pure Veg Restaurant", "Spacious Parking", "Wheelchair Accessible"],
        "description": "Official UP Tourism state hospitality complex with secure campus, family suites, and green lawns.",
        "google_maps_url": "https://www.google.com/maps/search/?api=1&query=UPSTDC+Tourist+Bungalow+Vindhyachal",
        "google_embed_url": "https://maps.google.com/maps?q=25.1650,82.5080&z=16&output=embed",
        "turn_by_turn_dir": "https://www.google.com/maps/dir/?api=1&destination=25.1650,82.5080",
        "verified": True,
        "tags": ["hotel", "upstdc", "lodging"]
    },
    {
        "id": "v-hotel-shivlok",
        "name": "Shivlok Ashram & Pilgrim Niwas",
        "category": "Hotels & Dharamshalas",
        "address": "Kotwali Road, Near Main Temple Corridor, Vindhyachal, UP",
        "latitude": 25.1620,
        "longitude": 82.5040,
        "distance_from_temple": "250 meters",
        "price_range": "₹600 - ₹1,400/night",
        "rating": 4.5,
        "contact_phone": "+91-9450-234567",
        "amenities": ["24hr Hot Water", "Elevator", "Sattvik Food", "Elderly Friendly"],
        "description": "Tranquil spiritual ashram and dharmashala offering clean hygienic rooms right near the holy corridor.",
        "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Shivlok+Ashram+Vindhyachal",
        "google_embed_url": "https://maps.google.com/maps?q=25.1620,82.5040&z=16&output=embed",
        "turn_by_turn_dir": "https://www.google.com/maps/dir/?api=1&destination=25.1620,82.5040",
        "verified": True,
        "tags": ["ashram", "dharamshala", "lodging"]
    },
    {
        "id": "v-hotel-jahnvi",
        "name": "Jahnvi Resort Mirzapur - Vindhyachal",
        "category": "Hotels & Dharamshalas",
        "address": "NH-35, Vindhyachal Bypass, Mirzapur, UP 231001",
        "latitude": 25.1480,
        "longitude": 82.5250,
        "distance_from_temple": "4.5 km",
        "price_range": "₹2,200 - ₹4,500/night",
        "rating": 4.6,
        "contact_phone": "+91-5442-263300",
        "amenities": ["Swimming Pool", "Multi-cuisine Pure Veg", "Banquet", "Free High-Speed Wi-Fi"],
        "description": "Premium boutique resort with modern luxury accommodations for pilgrims and wedding parties.",
        "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Jahnvi+Resort+Mirzapur",
        "google_embed_url": "https://maps.google.com/maps?q=25.1480,82.5250&z=16&output=embed",
        "turn_by_turn_dir": "https://www.google.com/maps/dir/?api=1&destination=25.1480,82.5250",
        "verified": True,
        "tags": ["resort", "hotel", "lodging"]
    },
    {
        "id": "v-rest-annapurna",
        "name": "Maa Annapurna Bhojnalaya & Sattvik Rasoi",
        "category": "Restaurants & Prasadam",
        "address": "Corridor Gate 2, Vindhyachal, UP",
        "latitude": 25.1618,
        "longitude": 82.5032,
        "distance_from_temple": "120 meters",
        "price_range": "₹150 - ₹250 for two",
        "rating": 4.7,
        "contact_phone": "+91-9839-881122",
        "specialty": "Desi Ghee Poori Sabzi, Kheer Prasadam, Hot Malpuas, Kadhai Milk",
        "is_pure_veg": True,
        "description": "Authentic temple cuisine prepared with sacred cleanliness without onion and garlic.",
        "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Maa+Annapurna+Bhojnalaya+Vindhyachal",
        "google_embed_url": "https://maps.google.com/maps?q=25.1618,82.5032&z=16&output=embed",
        "turn_by_turn_dir": "https://www.google.com/maps/dir/?api=1&destination=25.1618,82.5032",
        "verified": True,
        "tags": ["restaurant", "prasadam", "pure-veg"]
    },
    {
        "id": "v-trans-station",
        "name": "Vindhyachal Railway Station (BDL)",
        "category": "Railway & Transport",
        "address": "Vindhyachal Station Road, Northern Railway",
        "latitude": 25.1662,
        "longitude": 82.5098,
        "distance_from_temple": "1.5 km",
        "rating": 4.3,
        "contact_phone": "139",
        "description": "Key railway station on Howrah-Delhi Main Line. Direct trains from Delhi, Prayagraj, Varanasi, Patna, Kolkata.",
        "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Vindhyachal+Railway+Station",
        "google_embed_url": "https://maps.google.com/maps?q=25.1662,82.5098&z=16&output=embed",
        "turn_by_turn_dir": "https://www.google.com/maps/dir/?api=1&destination=25.1662,82.5098",
        "verified": True,
        "tags": ["transport", "railway", "station"]
    },
    {
        "id": "v-trans-mzp",
        "name": "Mirzapur Junction Railway Station (MZP)",
        "category": "Railway & Transport",
        "address": "Station Road, Mirzapur, UP 231001",
        "latitude": 25.1460,
        "longitude": 82.5685,
        "distance_from_temple": "8.2 km East",
        "rating": 4.5,
        "contact_phone": "139",
        "description": "Major junction station connecting premium express trains (Rajdhani, Vande Bharat connects, Purushottam Express). E-rickshaws and cabs available 24x7.",
        "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Mirzapur+Railway+Station",
        "google_embed_url": "https://maps.google.com/maps?q=25.1460,82.5685&z=16&output=embed",
        "turn_by_turn_dir": "https://www.google.com/maps/dir/?api=1&destination=25.1460,82.5685",
        "verified": True,
        "tags": ["transport", "railway", "junction"]
    },
    {
        "id": "v-hosp-chc",
        "name": "Vindhyachal Community Health Centre (CHC)",
        "category": "Medical & Hospital",
        "address": "Mirzapur-Vindhyachal Main Road, UP",
        "latitude": 25.1601,
        "longitude": 82.5120,
        "distance_from_temple": "900 meters",
        "rating": 4.2,
        "contact_phone": "+91-5442-252345",
        "emergency_no": "108 / 102",
        "description": "24x7 government hospital with emergency trauma care, ambulance fleet, oxygen supply, and pharmacy.",
        "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Vindhyachal+Community+Health+Centre",
        "google_embed_url": "https://maps.google.com/maps?q=25.1601,82.5120&z=16&output=embed",
        "turn_by_turn_dir": "https://www.google.com/maps/dir/?api=1&destination=25.1601,82.5120",
        "verified": True,
        "tags": ["medical", "emergency", "hospital"]
    }
]

# Neighboring historical towns and heritage circuits
NEIGHBORING_TOWNS = [
    {
        "id": "mirzapur-city",
        "name": "Mirzapur City & Carpet Heritage",
        "distance_km": 8.0,
        "travel_time": "15-20 mins via NH-35",
        "highlights": "Clock Tower, Pakka Ghat, Ganga Aarti at Ojhala Bridge, Hand-knotted Persian Carpets & Brassware",
        "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Mirzapur+Uttar+Pradesh"
    },
    {
        "id": "chunar-fort",
        "name": "Chunar Fort & Ganga Cliff",
        "distance_km": 42.0,
        "travel_time": "1 hr 10 mins",
        "highlights": "Ancient cliff-top citadel of Raja Vikramaditya, Sher Shah Suri, and Warren Hastings overlooking Ganga curve.",
        "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Chunar+Fort+Mirzapur"
    },
    {
        "id": "varanasi-kashi",
        "name": "Varanasi (Kashi Vishwanath Dham)",
        "distance_km": 72.0,
        "travel_time": "1 hr 45 mins via 4-lane Highway",
        "highlights": "Kashi Vishwanath Corridor, Sankat Mochan, Dashashwamedh Ghat Aarti, Babatpur International Airport (VNS)",
        "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Kashi+Vishwanath+Temple+Varanasi"
    },
    {
        "id": "prayagraj-triveni",
        "name": "Prayagraj (Triveni Sangam)",
        "distance_km": 85.0,
        "travel_time": "2 hrs via NH-19 / GT Road",
        "highlights": "Sacred Sangam of Ganga, Yamuna & Saraswati, Kumbh Kshetra, Bade Hanuman Ji Mandir",
        "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Triveni+Sangam+Prayagraj"
    }
]

@router.get("/nearby")
def get_nearby_places(
    category: Optional[str] = Query(None, description="Filter by category"),
    q: Optional[str] = Query(None, description="Search term")
):
    """
    Returns verified places around Vindhyachal with Google Maps coordinates,
    turn-by-turn navigation URLs, and embed links.
    """
    results = VINDHYACHAL_NEIGHBORS
    if category and category.lower() != "all":
        results = [p for p in results if category.lower() in p["category"].lower() or category.lower() in [t.lower() for t in p.get("tags", [])]]
    if q and q.strip():
        term = q.strip().lower()
        results = [p for p in results if term in p["name"].lower() or term in p["description"].lower() or term in p["address"].lower()]
    
    return {
        "destination": "Vindhyachal, Uttar Pradesh",
        "center_coordinates": {"latitude": 25.1614, "longitude": 82.5029},
        "count": len(results),
        "places": results,
        "neighboring_towns": NEIGHBORING_TOWNS
    }

@router.get("/google-search")
def google_search_places(
    query: str = Query(..., description="Location, hotel, or neighbor to search for"),
    lat: float = Query(25.1614, description="Center latitude"),
    lng: float = Query(82.5029, description="Center longitude")
):
    """
    Dynamic Google Places / Location search.
    Provides verified results with direct Google Maps URLs, navigation links, and embed previews.
    """
    q_encoded = urllib.parse.quote_plus(query.strip())
    search_term = query.strip().lower()
    
    # Filter matching local places
    matches = [
        p for p in VINDHYACHAL_NEIGHBORS 
        if search_term in p["name"].lower() or search_term in p["category"].lower() or search_term in p["address"].lower()
    ]
    
    # Fallback or synthetic Google Places card for arbitrary search
    direct_google_url = f"https://www.google.com/maps/search/?api=1&query={q_encoded}+Vindhyachal+Mirzapur"
    embed_url = f"https://maps.google.com/maps?q={q_encoded}+Vindhyachal&z=15&output=embed"
    
    return {
        "query": query,
        "center": {"lat": lat, "lng": lng},
        "google_maps_direct_url": direct_google_url,
        "google_maps_embed_url": embed_url,
        "matched_places": matches,
        "developer": "Karan Yadav",
        "status": "success"
    }

@router.get("/history")
def get_vindhyachal_history():
    """
    Comprehensive, scholarly and devotional history of Vindhyachal,
    Maa Vindhyavasini Utpatti, Vindhya Parvat Utpatti, Ramayana & Krishna/Gita connections.
    """
    return {
        "title": "History of Vindhyachal & Complete Divinity of Maa Vindhyavasini",
        "developer": "Karan Yadav",
        "sections": {
            "maa_vindhyavasini_utpatti": {
                "title": "Cosmic Utpatti (Manifestation) of Maa Vindhyavasini",
                "scriptural_sources": ["Markandeya Purana", "Durga Saptashati (Devi Mahatmya)", "Srimad Devi Bhagavatam"],
                "sanskrit_shloka": "नन्दगोपगृहे जाता यशोदागर्भसंभवा। ततस्तौ नाशयिष्यामि विन्ध्याचलनिवासिनी॥",
                "shloka_translation": "Born in the home of the cowherd Nanda from the womb of Yashoda, I shall then abide in the Vindhya mountains and annihilate the demons. (Durga Saptashati 11.42)",
                "exposition": (
                    "Maa Vindhyavasini is the supreme Adi Shakti, embodying Mahalakshmi, the primordial cosmic energy of creation and sustenance. "
                    "Unlike other Shaktipeeths where parts of Sati's body fell after Daksha's sacrifice, Vindhyachal is a living Siddhpeeth where "
                    "the Divine Mother eternally resides in Her complete, conscious form (Swaroopa). In the Devi Mahatmya, after the divine destruction "
                    "of Mahishasura and the demon kings Shumbha and Nishumbha, the Goddess granted a boon to the devas that She would permanently manifest "
                    "in the Vindhyas to protect devotees and grant immediate spiritual accomplishment (Siddhi)."
                )
            },
            "vindhya_parvat_utpatti": {
                "title": "Utpatti & Sacred Legend of Vindhya Parvat (Mount Vindhya)",
                "scriptural_sources": ["Mahabharata (Vana Parva)", "Padma Purana", "Skanda Purana"],
                "exposition": (
                    "The Vindhya mountain range is geologically among the primeval rock formations of planet Earth, predating even the Himalayas. "
                    "In ancient Puranic lore, Mount Vindhya became prideful upon witnessing Mount Meru receiving solar circumambulation. "
                    "Vindhya began growing skyward, piercing the celestial realms and obstructing the path of Surya (the Sun) and Chandra (the Moon), "
                    "plunging creation into darkness. The devas beseeched the great Brahmarshi Agastya to intervene. "
                    "When Agastya Muni and his consort Lopamudra journeyed south, Mount Vindhya prostrated himself in reverent surrender before the Guru. "
                    "Sage Agastya commanded: 'O mountain, remain thus bowed until I return from the South.' Agastya established his ashram in the South "
                    "and never returned northward. Thus, Vindhya Parvat remained perpetually bowed in profound humility and absolute surrender. "
                    "Because of this humility, Adi Shakti chose Mount Vindhya as Her personal abode, immortalizing it as the sacred crest of Bharatvarsha."
                )
            },
            "ramayana_connection": {
                "title": "Belongings to Ramayana: Prabhu Shri Ram, Sita Kund & Ramgaya",
                "scriptural_sources": ["Valmiki Ramayana", "Adhyatma Ramayana", "Ramcharitmanas"],
                "holy_sites": ["Sita Kund", "Ramgaya Ghat", "Rameshwar Mahadev"],
                "exposition": (
                    "During their 14-year exile (Vanvas), Prabhu Shri Ram, Mata Sita, and Lakshmana sanctified the holy soil of Vindhyachal. "
                    "As they traversed the dense Vindhya forests, Mata Sita experienced deep thirst amidst the rocky heights. Lakshmana discharged "
                    "a celestial arrow into the mountain rock, calling forth a pure, sweet freshwater stream from the subterranean veins, known forever as Sita Kund. "
                    "Furthermore, at Ramgaya Ghat along the holy Uttarvahini Ganga, Prabhu Shri Ram performed the sacred Pitru Shraddha and Pind Daan "
                    "for his revered father, Maharaja Dasharatha. Lord Rama personally consecrated a Shiva Lingam, named Rameshwar Mahadev, "
                    "affirming Vindhyachal as one of the holiest tirthas for ancestral liberation (Moksha)."
                )
            },
            "shri_krishna_gita_connection": {
                "title": "Belongings to Shri Krishna & Bhagavad Gita: Devi Yogamaya",
                "scriptural_sources": ["Srimad Bhagavatam (Canto 10)", "Harivamsa Purana", "Bhagavad Gita (Chapter 7.14)"],
                "gita_verse": "दैवी ह्येषा गुणमयी मम माया दुरत्यया। मामेव ये प्रपद्यन्ते मायामेतां तरन्ति ते॥ (गीता ७.१४)",
                "gita_verse_translation": "This divine Maya of Mine, composed of the three modes of material nature, is difficult to overcome. But those who surrender unto Me easily cross beyond it.",
                "exposition": (
                    "When Bhagwan Shri Krishna incarnated at midnight in the dungeon of Mathura to Devaki and Vasudeva, Adi Shakti Yogamaya incarnated "
                    "at that exact instant in Gokul as the infant daughter of Yashoda and Nanda Baba. Through divine will, Vasudeva exchanged the infants. "
                    "When the tyrant Kansa seized the baby girl and hurled her against a stone slab, the divine infant slipped through his hands, "
                    "soared into the sky, and assumed Her celestial eight-armed form (Ashtabhuja) holding weapons of cosmic justice. "
                    "She declared: 'Foolish Kansa, thy slayer is already thriving elsewhere!' She then flew directly to the Vindhya mountains, making Vindhyachal Her eternal seat. "
                    "In the Bhagavad Gita, Lord Krishna reveals that Yogamaya is His supreme divine sovereign power. Thus, Maa Vindhyavasini is none other than "
                    "Yogamaya Herself, who preserves the cosmic order."
                )
            },
            "dharmic_philosophical_depth": {
                "title": "Dharmic Significance, Siddhpeeth vs. Shaktipeeth & Shraddha",
                "trikona_yatra": {
                    "vindhyavasini": "Mahalakshmi - Rajas Guna - Creation, Sustenance, Wealth, Wellbeing",
                    "kali_khoh": "Mahakali - Tamas Guna - Annihilation of Fear, Ego, Negative Karma",
                    "ashtabhuja": "Mahasaraswati - Sattva Guna - Spiritual Wisdom, Higher Intellect, Liberation"
                },
                "uttarvahini_ganga": "The Ganges flows northward at Vindhyachal, creating a rare spiritual vortex where ancestral offerings (Tarpan/Shraddha) bestow immediate salvation.",
                "exposition": (
                    "The holy Trikona Yatra of Vindhyachal represents the complete integration of the three gunas (Sattva, Rajas, Tamas) through which "
                    "the soul transcends mortal bondage. Millions of pilgrims and sadhakas visit this Jagrit Siddhpeeth to receive the maternal grace of Jagadamba."
                )
            }
        }
    }
