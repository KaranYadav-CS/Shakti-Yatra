export type Language = 'en' | 'hi';

export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: Translations = {
  // --- TOP BAR & ACCREDITATION ---
  top_bar_title: {
    en: "Shakti Yatra • Smart Pilgrimage Assistance Platform",
    hi: "शक्ति यात्रा • स्मार्ट तीर्थ सहायता मंच",
  },
  developed_by: {
    en: "Developed by Karan Yadav",
    hi: "करण यादव द्वारा विकसित",
  },
  designed_and_developed_by: {
    en: "Designed & Developed by Karan Yadav",
    hi: "करण यादव द्वारा परिकल्पित एवं विकसित",
  },

  // --- NAVIGATION ---
  nav_home: {
    en: "Home",
    hi: "मुख्य पृष्ठ",
  },
  nav_vindhyachal: {
    en: "Vindhyachal Dham",
    hi: "विन्ध्याचल धाम",
  },
  nav_history: {
    en: "History & Utpatti",
    hi: "इतिहास एवं उत्पत्ति",
  },
  nav_photos: {
    en: "Maa Photos",
    hi: "माँ के दर्शन चित्र",
  },
  nav_hotels_map: {
    en: "Hotels & Map",
    hi: "होटल व मानचित्र",
  },
  nav_explore: {
    en: "Explore Shrines",
    hi: "तीर्थ अन्वेषण",
  },
  nav_plan: {
    en: "Plan Yatra",
    hi: "यात्रा योजना",
  },
  nav_emergency: {
    en: "Emergency",
    hi: "आपातकालीन",
  },
  nav_my_yatra: {
    en: "My Yatra",
    hi: "मेरी यात्रा",
  },
  nav_tagline: {
    en: "Discover • Plan • Experience",
    hi: "दर्शन • योजना • अनुभूति",
  },

  // --- HERO SECTION ---
  hero_badge: {
    en: "Smart Pilgrimage Platform • Developed by Karan Yadav",
    hi: "स्मार्ट तीर्थ सहायता मंच • करण यादव द्वारा विकसित",
  },
  hero_welcome: {
    en: "Welcome to",
    hi: "स्वागत है",
  },
  hero_destination: {
    en: "Vindhyachal",
    hi: "विन्ध्याचल धाम",
  },
  hero_quote: {
    en: "“Your intelligent companion for a meaningful pilgrimage.”",
    hi: "“सार्थक तीर्थयात्रा के लिए आपका ज्ञानवान साथी।”",
  },
  hero_desc: {
    en: "Discover the eternal sanctum of Adi Shakti Maa Vindhyavasini on the sacred banks of the Ganges. Walk the holy Trikona Yatra with verified Aarti schedules, 3D interactive guidance, and accessibility-tailored planning.",
    hi: "पवित्र गंगा तट पर आदिशक्ति माँ विंध्यवासिनी के शाश्वत पावन धाम के दर्शन करें। प्रामाणिक आरती समय, 3D मार्गदर्शन और सुगम त्रिकोण यात्रा का अनुभव प्राप्त करें।",
  },
  btn_explore_vindhyachal: {
    en: "Explore Vindhyachal",
    hi: "विन्ध्याचल दर्शन",
  },
  btn_view_photos: {
    en: "View Maa Photos",
    hi: "माँ के दर्शन चित्र",
  },
  btn_history_utpatti: {
    en: "History & Utpatti",
    hi: "इतिहास एवं उत्पत्ति",
  },
  btn_plan_yatra: {
    en: "Plan My Yatra",
    hi: "यात्रा योजना बनाएं",
  },
  btn_ask_assistant: {
    en: "Ask Shakti Assistant",
    hi: "शक्ति सहायक से पूछें",
  },

  // --- KEY STATS CARDS ---
  stat_sanctum: {
    en: "Sacred Sanctum",
    hi: "पावन पीठ",
  },
  stat_sanctum_val: {
    en: "Siddhpeeth",
    hi: "सिद्धपीठ",
  },
  stat_sanctum_sub: {
    en: "Mahalakshmi Swaroop",
    hi: "महालक्ष्मी स्वरूप",
  },
  stat_geometry: {
    en: "Holy Geometry",
    hi: "पवित्र परिक्रमा",
  },
  stat_geometry_val: {
    en: "Trikona Yatra",
    hi: "त्रिकोण यात्रा",
  },
  stat_geometry_sub: {
    en: "3 Devi Manifestations",
    hi: "तीन देवी स्वरूप",
  },
  stat_access: {
    en: "Accessibility",
    hi: "सुगमता",
  },
  stat_access_val: {
    en: "Aerial Ropeway",
    hi: "रोपवे सुविधा",
  },
  stat_access_sub: {
    en: "Senior Citizen Friendly",
    hi: "वरिष्ठ नागरिकों हेतु सुगम",
  },
  stat_verify: {
    en: "Verification",
    hi: "प्रमाणीकरण",
  },
  stat_verify_val: {
    en: "100% Grounded",
    hi: "100% प्रामाणिक",
  },
  stat_verify_sub: {
    en: "Zero Hallucinations",
    hi: "सटीक व सत्यापित तथ्य",
  },

  // --- EMERGENCY SECTION ---
  emergency_badge: {
    en: "24x7 Verified Pilgrimage Helplines",
    hi: "24x7 सत्यापित तीर्थ आपातकालीन हेल्पलाइन",
  },
  emergency_title: {
    en: "Emergency Assistance Center",
    hi: "आपातकालीन सहायता केंद्र",
  },
  emergency_desc: {
    en: "Direct, tap-to-call verified contacts for police responders, medical trauma centers, temple pilgrim control, and women safety in Vindhyachal.",
    hi: "विंध्याचल में पुलिस, आपातकालीन अस्पताल, एम्बुलेंस, महिला सुरक्षा, एवं मंदिर नियंत्रण कक्ष के त्वरित सत्यापित संपर्क।",
  },
  emergency_immediate_help: {
    en: "Need Immediate On-Ground Assistance?",
    hi: "क्या आपको तत्काल सहायता की आवश्यकता है?",
  },
  emergency_immediate_sub: {
    en: "Share your live GPS coordinates with emergency responders, family, or the local shrine control room.",
    hi: "आपातकालीन दल, परिवार या स्थानीय मंदिर नियंत्रण कक्ष के साथ अपनी लाइव GPS लोकेशन साझा करें।",
  },
  emergency_share_btn: {
    en: "Share My GPS Location",
    hi: "अपनी लाइव लोकेशन भेजें",
  },
  emergency_dial_112: {
    en: "Dial Police (112)",
    hi: "पुलिस को कॉल करें (112)",
  },
  emergency_dial_108: {
    en: "Dial Ambulance (108)",
    hi: "एम्बुलेंस को कॉल करें (108)",
  },
  emergency_dial_1090: {
    en: "Women Helpline (1090)",
    hi: "महिला हेल्पलाइन (1090)",
  },
  emergency_filter_all: {
    en: "All Helplines",
    hi: "सभी हेल्पलाइन",
  },
  emergency_filter_police: {
    en: "Police Stations",
    hi: "पुलिस स्टेशन",
  },
  emergency_filter_hospital: {
    en: "Hospitals & Trauma",
    hi: "अस्पताल व स्वास्थ्य केंद्र",
  },
  emergency_filter_ambulance: {
    en: "Ambulance Units",
    hi: "एम्बुलेंस सेवा",
  },
  emergency_filter_women: {
    en: "Women Safety",
    hi: "महिला सुरक्षा",
  },
  emergency_filter_temple: {
    en: "Temple Control Room",
    hi: "मंदिर नियंत्रण कक्ष",
  },
  emergency_filter_tourism: {
    en: "UP Tourism & Helpdesk",
    hi: "पर्यटन सहायता",
  },
  emergency_filter_disaster: {
    en: "Fire & Disaster",
    hi: "अग्निशमन व आपदा राहत",
  },
  emergency_call_now: {
    en: "Call",
    hi: "कॉल करें",
  },
  emergency_get_directions: {
    en: "Get Directions",
    hi: "रास्ता देखें (GPS)",
  },
  emergency_copy_num: {
    en: "Copy Number",
    hi: "नंबर कॉपी करें",
  },
  emergency_copied: {
    en: "Copied!",
    hi: "कॉपी हो गया!",
  },
  emergency_alt: {
    en: "Alt Line:",
    hi: "वैकल्पिक नंबर:",
  },
  nearest_police_badge: {
    en: "Nearest Police Station: Vindhyachal Kotwali (800m)",
    hi: "निकटतम पुलिस स्टेशन: कोतवाली विंध्याचल (800 मी.)",
  },
  nearest_hospital_badge: {
    en: "Nearest Hospital: CHC Vindhyachal (900m)",
    hi: "निकटतम अस्पताल: सामुदायिक स्वास्थ्य केंद्र विंध्याचल (900 मी.)",
  },
  emergency_search_placeholder: {
    en: "Search emergency services (hospital, police, ambulance, 1090, tourism)...",
    hi: "आपातकालीन सेवाएं खोजें (अस्पताल, पुलिस, एम्बुलेंस, 1090, पर्यटन)...",
  },
  emergency_speed_dial_title: {
    en: "Instant 1-Tap Emergency Speed Dialers",
    hi: "त्वरित 1-टैप आपातकालीन हेल्पलाइन डायलर्स",
  },
  emergency_featured_nearest: {
    en: "Primary Nearest On-Ground Emergency Services",
    hi: "निकटतम प्राथमिक आपातकालीन सेवाएं",
  },
  emergency_nearest_police_title: {
    en: "Nearest Police Station",
    hi: "निकटतम पुलिस स्टेशन",
  },
  emergency_nearest_hospital_title: {
    en: "Nearest Hospital & 24x7 Trauma Unit",
    hi: "निकटतम अस्पताल व 24x7 ट्रॉमा यूनिट",
  },
  emergency_dist_label: {
    en: "Distance from Mandir:",
    hi: "मंदिर से दूरी:",
  },
  emergency_open_24x7: {
    en: "Active 24x7 Emergency",
    hi: "24x7 सक्रिय आपात सेवा",
  },
  emergency_no_records: {
    en: "No emergency contacts matched your filter or search query.",
    hi: "आपकी खोज के अनुसार कोई आपातकालीन संपर्क नहीं मिला।",
  },
  emergency_safety_title: {
    en: "Pilgrim Safety & Verification Assurance",
    hi: "श्रद्धालु सुरक्षा एवं प्रामाणिकता आश्वासन",
  },
  emergency_safety_text: {
    en: "All telephone helplines published here are officially cross-checked with the Mirzapur District Administration, UP Police, and National Health Mission UP. In the event of an urgent emergency at the riverfront or corridor, alert any stationed UP Police officer or visit the Shrine Board Control Room at Corridor Gate 1.",
    hi: "यहाँ प्रकाशित सभी हेल्पलाइन नंबर मिर्ज़ापुर जिला प्रशासन, उत्तर प्रदेश पुलिस एवं राष्ट्रीय स्वास्थ्य मिशन (UP) द्वारा सत्यापित हैं। घाट या कॉरिडोर पर किसी भी आपात स्थिति में तैनात पुलिस कर्मी को सूचित करें अथवा कॉरिडोर गेट 1 स्थित मंदिर नियंत्रण कक्ष में संपर्क करें।",
  },

  // --- PHOTO GALLERY ---
  gallery_badge: {
    en: "Dedicated Photo Module",
    hi: "विशेष पावन छायाचित्र संकलन",
  },
  gallery_title: {
    en: "Maa Vindhyavasini Pavitra Darshan Gallery",
    hi: "माँ विंध्यवासिनी पवित्र दर्शन दीर्घा",
  },
  gallery_desc: {
    en: "Authentic, blessed glimpses of Maa Vindhyavasini Devi, sacred morning shringar, and the grand holy Dham. Hover over any photo to experience 3D depth and zoom.",
    hi: "माँ विंध्यवासिनी के मनोहारी दिव्य शृंगार, पवित्र परिक्रमा मार्ग एवं भव्य विंध्य धाम के प्रामाणिक छायाचित्र। 3D दर्शन हेतु किसी भी चित्र पर क्लिक करें।",
  },
  gallery_photos_count: {
    en: "Authentic Photographs",
    hi: "प्रामाणिक छायाचित्र",
  },
  gallery_click_zoom: {
    en: "Click for full view",
    hi: "विस्तृत दर्शन हेतु क्लिक करें",
  },

  // --- HISTORY MODULE ---
  history_badge: {
    en: "Sacred Chronicles & Intellectual Wisdom",
    hi: "पवित्र पौराणिक गाथा एवं आध्यात्मिक तत्वज्ञान",
  },
  history_title: {
    en: "History of Vindhyachal & Complete Divinity of Maa Vindhyavasini",
    hi: "विन्ध्याचल का इतिहास एवं माँ विन्ध्यवासिनी की पूर्ण दिव्यता",
  },
  history_desc: {
    en: "Explore the eternal origins, Puranic chronicles, scriptural citations from the Ramayana, Mahabharata, and Gita, and the intellectual philosophy behind India's foremost living Siddhpeeth.",
    hi: "आदिशक्ति के प्राकट्य, विंध्य पर्वत के समर्पण, रामायण व श्रीमद्भगवद्गीता के प्रसंगों तथा जाग्रत सिद्धपीठ के दार्शनिक महत्व का संपूर्ण अध्ययन करें।",
  },
  tab_maa_utpatti: {
    en: "Maa Utpatti",
    hi: "माँ की उत्पत्ति",
  },
  tab_parvat_utpatti: {
    en: "Vindhya Parvat",
    hi: "विंध्य पर्वत",
  },
  tab_ramayana: {
    en: "Ramayana Era",
    hi: "रामायण प्रसंग",
  },
  tab_krishna_gita: {
    en: "Shri Krishna & Gita",
    hi: "श्रीकृष्ण व गीता",
  },
  tab_dharmic_shraddha: {
    en: "Dharmic & Shraddha",
    hi: "धार्मिक महत्व व श्राद्ध",
  },

  // --- GOOGLE PLACES EXPLORER ---
  places_badge: {
    en: "Google Maps & Location Intelligence",
    hi: "गूगल मैप्स व स्थान अन्वेषण",
  },
  places_title: {
    en: "Vindhyachal Neighbor Locations & Hotels Finder",
    hi: "विन्ध्याचल निकटवर्ती स्थल व होटल खोजकर्ता",
  },
  places_desc: {
    en: "Real-time coordinates, live Google Maps turn-by-turn navigation, verified hotels, sacred ghats, and neighbor heritage towns around Maa Vindhyavasini Dham.",
    hi: "माँ विंध्यवासिनी धाम के आसपास सत्यापित होटल, धर्मशालाएं, पवित्र घाट एवं पड़ोसी ऐतिहासिक नगरों के लाइव गूगल मैप्स नेविगेशन।",
  },
  places_search_placeholder: {
    en: "Search hotel, ghat, station...",
    hi: "होटल, धर्मशाला, घाट, स्टेशन खोजें...",
  },
  places_cat_all: {
    en: "All Shrines & Places",
    hi: "सभी स्थल",
  },
  places_cat_hotels: {
    en: "Hotels & Dharamshalas",
    hi: "होटल व धर्मशालाएं",
  },
  places_cat_temples: {
    en: "Sacred Temples & Kunds",
    hi: "पवित्र मंदिर व कुंड",
  },
  places_cat_food: {
    en: "Sattvik Food & Prasadam",
    hi: "सात्विक भोजन व प्रसाद",
  },
  places_cat_transport: {
    en: "Stations & Transport",
    hi: "स्टेशन व आवागमन",
  },
  places_cat_medical: {
    en: "Hospitals & CHC",
    hi: "अस्पताल व स्वास्थ्य केंद्र",
  },

  // --- SOLAR DESTINATION NAVIGATOR ---
  solar_badge: {
    en: "3D Cosmic Destination Orbit",
    hi: "3D ब्रह्मांडीय तीर्थ परिक्रमा",
  },
  solar_title: {
    en: "Sacred Shakti Peeth Constellation",
    hi: "पवित्र शक्तिपीठ नक्षत्र मंडल",
  },
  solar_desc: {
    en: "Journey through India's holy Shakti shrines revolving around the divine source. Hover or click any celestial body for smooth 3D depth and verified details.",
    hi: "परम शक्ति स्रोत के चारों ओर परिक्रमा करते भारत के पावन शक्तिपीठों का अवलोकन करें।",
  },

  // --- FOOTER ---
  footer_hub_title: {
    en: "Pilgrimage Hub",
    hi: "तीर्थ संकलन",
  },
  footer_portals_title: {
    en: "Verified Portals",
    hi: "सत्यापित पोर्टल",
  },
  footer_dev_title: {
    en: "Developer & Platform",
    hi: "विकासकर्ता एवं मंच",
  },
  footer_copyright: {
    en: "Shakti Yatra. All verified sacred information attributed to respective shrine authorities.",
    hi: "शक्ति यात्रा। सभी सत्यापित धार्मिक सूचनाएं संबंधित मंदिर व तीर्थ प्राधिकारियों के सौजन्य से।",
  },
};
