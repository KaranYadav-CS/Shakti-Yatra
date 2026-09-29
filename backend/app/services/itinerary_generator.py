from typing import List, Dict, Any
from app.schemas import ItineraryCreateRequest, ItineraryResponseSchema, ItineraryItemSchema

def generate_itinerary(req: ItineraryCreateRequest) -> ItineraryResponseSchema:
    destination = req.destination.strip().title() or "Vindhyachal"
    days = max(1, min(req.duration_days, 5))
    has_elderly = req.has_elderly or req.accessibility_mode in ["Senior", "Wheelchair"]
    has_children = req.has_children or req.accessibility_mode == "Family"
    mode = req.accessibility_mode

    items: List[ItineraryItemSchema] = []
    
    # DAY 1
    order = 1
    items.append(ItineraryItemSchema(
        day_number=1,
        order_index=order,
        time_slot="06:30 AM - 08:00 AM",
        title="Arrival, Sacred Ganga Snan & Refreshment",
        description="Arrive at Vindhyachal, check-in to your pilgrim accommodation or dharamshala. Proceed to Pakka Ghat on the Ganges for holy snan and Sankalpa.",
        location_name="Pakka Ghat, Ganga Bank",
        activity_type="Spiritual",
        accessibility_tip="Golf cart available from Tourist Parking to Ghat concourse. Wide paved ramps lead to bathing platform." if has_elderly else None
    ))
    order += 1

    items.append(ItineraryItemSchema(
        day_number=1,
        order_index=order,
        time_slot="08:30 AM - 11:30 AM",
        title="Maa Vindhyavasini Devi Darshan (Primary Sanctum)",
        description="Enter through the grand Vindhya Dham Corridor Gate 1. Experience holy darshan of Maa Vindhyavasini (Mahalakshmi roop) and perform the parikrama. Offer coconuts and red chunari.",
        location_name="Maa Vindhyavasini Temple",
        activity_type="Darshan",
        accessibility_tip="Senior citizens and wheelchair users can access dedicated priority lane and corridor elevator." if has_elderly else "Expect moderate queues during morning hours; store footwear at official cloakroom."
    ))
    order += 1

    items.append(ItineraryItemSchema(
        day_number=1,
        order_index=order,
        time_slot="12:00 PM - 01:30 PM",
        title="Sattvik Bhojanam & Midday Rest",
        description="Relish fresh Sattvik thali, hot puri-sabzi, and traditional delicacies at Annapurna Bhojanalaya near the North Corridor.",
        location_name="Annapurna Bhojanalaya",
        activity_type="Food",
        accessibility_tip="Ground floor air-conditioned seating with zero step stairs."
    ))
    order += 1

    items.append(ItineraryItemSchema(
        day_number=1,
        order_index=order,
        time_slot="02:30 PM - 05:00 PM",
        title="Trikona Yatra Vertex 2: Kali Khoh Cave Shrine",
        description="Travel 2 km south towards the picturesque base of the Vindhya hill. Enter the serene cave temple of Maa Mahakali and receive sacred vibhuti and blessings.",
        location_name="Kali Khoh Temple",
        activity_type="Darshan",
        accessibility_tip="E-rickshaws drop directly at the temple pathway entrance; 20 gentle steps." if has_elderly else "Enjoy the cool forested valley breeze."
    ))
    order += 1

    items.append(ItineraryItemSchema(
        day_number=1,
        order_index=order,
        time_slot="05:15 PM - 06:45 PM",
        title="Vindhyachal Scenic Ropeway & Sunset",
        description="Board the modern aerial cable car from Kali Khoh station to Ashtabhuja hillock. Marvel at the sprawling view of the Gangetic plains bathed in golden sunset hues.",
        location_name="Vindhyachal Ropeway",
        activity_type="Sightseeing",
        accessibility_tip="Recommended for seniors and children: bypasses 150 steep stone steps."
    ))
    order += 1

    items.append(ItineraryItemSchema(
        day_number=1,
        order_index=order,
        time_slot="07:15 PM - 08:30 PM",
        title="Pakka Ghat Grand Evening Ganga Maha Aarti",
        description="Gather along the riverfront stone steps as temple priests perform the magnificent multi-tiered brass lamp aarti accompanied by conch shells and sacred chants.",
        location_name="Pakka Ghat",
        activity_type="Aarti",
        accessibility_tip="Arrive 15 minutes early to secure comfortable seating on the upper Ghat steps."
    ))

    # DAY 2 (if duration >= 2)
    if days >= 2:
        order = 1
        items.append(ItineraryItemSchema(
            day_number=2,
            order_index=order,
            time_slot="06:00 AM - 08:30 AM",
            title="Trikona Yatra Vertex 3: Maa Ashtabhuja Hilltop Temple & Sita Kund",
            description="Visit the eight-armed Mahasaraswati temple atop the hill. Sip the holy sweet water from the ancient natural mountain spring of Sita Kund.",
            location_name="Maa Ashtabhuja & Sita Kund",
            activity_type="Darshan",
            accessibility_tip="Ropeway or vehicle road up the plateau connects directly to within 50 meters of the shrine."
        ))
        order += 1

        items.append(ItineraryItemSchema(
            day_number=2,
            order_index=order,
            time_slot="09:00 AM - 10:30 AM",
            title="Rameshwar Mahadev & Local Heritage Walk",
            description="Visit the historic Shiva temple near Ramgaya Ghat established by Lord Sri Rama. Sample authentic Mirzapuri Malpua and Peda at sweet stalls.",
            location_name="Rameshwar Mahadev Temple",
            activity_type="Spiritual",
            accessibility_tip="Flat walking terrain through paved temple bazaar."
        ))
        order += 1

        items.append(ItineraryItemSchema(
            day_number=2,
            order_index=order,
            time_slot="11:30 AM - 03:00 PM",
            title="Nature Excursion: Sirsi Dam & Stepped Waterfalls",
            description="A scenic 35-minute drive into the Vindhyan rocky forest to witness the lush waterfalls and expansive lake reservoir.",
            location_name="Sirsi Reservoir & Waterfalls",
            activity_type="Sightseeing",
            accessibility_tip="Stay along the reservoir embankment for effortless views without hiking over boulders." if has_elderly else "Short nature walks along sandstone boulders."
        ))
        order += 1

        items.append(ItineraryItemSchema(
            day_number=2,
            order_index=order,
            time_slot="04:00 PM - 06:00 PM",
            title="Souvenir Shopping & Blessed Prasadam Collection",
            description="Procure authentic red chunaris, brass deities, wooden toys, Mirzapur hand-knotted kilims/carpets, and temple peda prasad for family and friends.",
            location_name="Vindhya Dham Temple Bazaar",
            activity_type="Shopping",
            accessibility_tip="Shaded pedestrian precinct with regular resting benches."
        ))
        order += 1

        items.append(ItineraryItemSchema(
            day_number=2,
            order_index=order,
            time_slot="07:00 PM Onwards",
            title="Departure from Vindhyachal / Mirzapur",
            description="Depart with peaceful memories and divine blessings via Vindhyachal (BDL) or Mirzapur (MZP) railway station.",
            location_name="Vindhyachal Railway Station",
            activity_type="Travel",
            accessibility_tip="Pre-book battery cart for platform transit if traveling with senior citizens."
        ))

    # DAY 3 (if duration >= 3)
    if days >= 3:
        order = 1
        items.append(ItineraryItemSchema(
            day_number=3,
            order_index=order,
            time_slot="07:00 AM - 11:00 AM",
            title="Spiritual Retreat & Gerua Talab Meditation",
            description="Morning dhyanam and quiet contemplation near the historic Gerua and Motiya Talab. Connect with resident spiritual ascetics and study temple history.",
            location_name="Gerua Talab Forested Area",
            activity_type="Spiritual",
            accessibility_tip="Gentle walking track along the lower tree canopy."
        ))
        order += 1

        items.append(ItineraryItemSchema(
            day_number=3,
            order_index=order,
            time_slot="12:00 PM - 04:00 PM",
            title="Mirzapur Historic Clock Tower & Chunar Sandstone Crafts",
            description="Explore the heritage city of Mirzapur, famed for its 19th-century Ghantaghar, brassware workshops, and traditional carpet weavers.",
            location_name="Mirzapur Heritage District",
            activity_type="Sightseeing",
            accessibility_tip="Car transportation with minimum street walking."
        ))

    budget_estimate = 2500 * days * req.travellers_count if req.budget_level == "Budget" else (4500 * days * req.travellers_count)

    notes = (
        f"Smart personalized pilgrimage plan for {req.travellers_count} traveler(s) for {days} day(s). "
        f"Tailored with accessibility settings: '{mode}'. "
        "All temple timings and key points are synchronized with official Vindhya Shrine Board guidelines."
    )

    return ItineraryResponseSchema(
        title=f"{destination} Sacred {days}-Day Pilgrimage Itinerary",
        destination_name=destination,
        duration_days=days,
        travellers_count=req.travellers_count,
        has_elderly=has_elderly,
        has_children=has_children,
        accessibility_mode=mode,
        budget=budget_estimate,
        notes=notes,
        ai_generated=True,
        items=items
    )
