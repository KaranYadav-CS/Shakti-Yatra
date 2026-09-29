import sys
import os
from sqlalchemy.orm import Session
from passlib.context import CryptContext

# Add backend directory to sys.path so app can be imported
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from app.database import engine, Base, SessionLocal
from app.services.auth_service import hash_password
from app.models import (
    Destination, Temple, TempleTiming, TempleFestival,
    Attraction, Hotel, Restaurant, Facility, TransportPoint,
    EmergencyContact, User, Source
)
from app.seed.seed_data import (
    DESTINATIONS_DATA, TEMPLES_DATA, ATTRACTIONS_DATA,
    HOTELS_DATA, RESTAURANTS_DATA, FACILITIES_DATA,
    TRANSPORT_POINTS_DATA, EMERGENCY_CONTACTS_DATA
)

def run_seed():
    print("[*] Creating database tables if they do not exist...")
    Base.metadata.create_all(bind=engine)
    
    db: Session = SessionLocal()
    try:
        # 1. Admin User
        admin_email = "admin@shaktiyatra.com"
        admin = db.query(User).filter(User.email == admin_email).first()
        if not admin:
            print("[+] Creating default admin user...")
            hashed_pw = hash_password("admin123")
            admin = User(
                email=admin_email,
                name="Admin (Karan Yadav)",
                hashed_password=hashed_pw,
                is_admin=True
            )
            db.add(admin)
            db.commit()

        # 2. Destinations
        print("[*] Seeding destinations...")
        dest_map = {}
        for d in DESTINATIONS_DATA:
            existing = db.query(Destination).filter(Destination.slug == d["slug"]).first()
            if not existing:
                dest = Destination(**d)
                db.add(dest)
                db.commit()
                db.refresh(dest)
                dest_map[d["slug"]] = dest.id
            else:
                dest_map[d["slug"]] = existing.id

        # 3. Temples
        print("[*] Seeding temples, timings, and festivals...")
        for t in TEMPLES_DATA:
            dest_id = dest_map.get(t["destination_slug"])
            if not dest_id:
                continue
            existing = db.query(Temple).filter(
                Temple.destination_id == dest_id,
                Temple.name == t["name"]
            ).first()

            timings_data = t.get("timings", [])
            festivals_data = t.get("festivals", [])
            temple_fields = {k: v for k, v in t.items() if k not in ["destination_slug", "timings", "festivals"]}
            temple_fields["destination_id"] = dest_id

            if not existing:
                temple = Temple(**temple_fields)
                db.add(temple)
                db.commit()
                db.refresh(temple)
                
                for tm in timings_data:
                    timing_obj = TempleTiming(temple_id=temple.id, **tm)
                    db.add(timing_obj)
                for f in festivals_data:
                    festival_obj = TempleFestival(temple_id=temple.id, **f)
                    db.add(festival_obj)
                db.commit()

        # 4. Attractions
        print("[*] Seeding attractions...")
        for a in ATTRACTIONS_DATA:
            dest_id = dest_map.get(a["destination_slug"])
            if not dest_id:
                continue
            existing = db.query(Attraction).filter(
                Attraction.destination_id == dest_id,
                Attraction.name == a["name"]
            ).first()
            if not existing:
                fields = {k: v for k, v in a.items() if k != "destination_slug"}
                fields["destination_id"] = dest_id
                attraction = Attraction(**fields)
                db.add(attraction)
        db.commit()

        # 5. Hotels
        print("[*] Seeding hotels and stay...")
        for h in HOTELS_DATA:
            dest_id = dest_map.get(h["destination_slug"])
            if not dest_id:
                continue
            existing = db.query(Hotel).filter(
                Hotel.destination_id == dest_id,
                Hotel.name == h["name"]
            ).first()
            if not existing:
                fields = {k: v for k, v in h.items() if k != "destination_slug"}
                fields["destination_id"] = dest_id
                hotel = Hotel(**fields)
                db.add(hotel)
        db.commit()

        # 6. Restaurants
        print("[*] Seeding restaurants and food...")
        for r in RESTAURANTS_DATA:
            dest_id = dest_map.get(r["destination_slug"])
            if not dest_id:
                continue
            existing = db.query(Restaurant).filter(
                Restaurant.destination_id == dest_id,
                Restaurant.name == r["name"]
            ).first()
            if not existing:
                fields = {k: v for k, v in r.items() if k != "destination_slug"}
                fields["destination_id"] = dest_id
                restaurant = Restaurant(**fields)
                db.add(restaurant)
        db.commit()

        # 7. Facilities
        print("[*] Seeding facilities...")
        for f in FACILITIES_DATA:
            dest_id = dest_map.get(f["destination_slug"])
            if not dest_id:
                continue
            existing = db.query(Facility).filter(
                Facility.destination_id == dest_id,
                Facility.name == f["name"]
            ).first()
            if not existing:
                fields = {k: v for k, v in f.items() if k != "destination_slug"}
                fields["destination_id"] = dest_id
                facility = Facility(**fields)
                db.add(facility)
        db.commit()

        # 8. Transport Points
        print("[*] Seeding transport hubs...")
        for tp in TRANSPORT_POINTS_DATA:
            dest_id = dest_map.get(tp["destination_slug"])
            if not dest_id:
                continue
            existing = db.query(TransportPoint).filter(
                TransportPoint.destination_id == dest_id,
                TransportPoint.name == tp["name"]
            ).first()
            if not existing:
                fields = {k: v for k, v in tp.items() if k != "destination_slug"}
                fields["destination_id"] = dest_id
                tp_obj = TransportPoint(**fields)
                db.add(tp_obj)
        db.commit()

        # 9. Emergency Contacts
        print("[*] Seeding verified emergency contacts...")
        for ec in EMERGENCY_CONTACTS_DATA:
            dest_id = dest_map.get(ec["destination_slug"])
            if not dest_id:
                continue
            existing = db.query(EmergencyContact).filter(
                EmergencyContact.destination_id == dest_id,
                EmergencyContact.service_name == ec["service_name"]
            ).first()
            if not existing:
                fields = {k: v for k, v in ec.items() if k != "destination_slug"}
                fields["destination_id"] = dest_id
                ec_obj = EmergencyContact(**fields)
                db.add(ec_obj)
        db.commit()

        print("[OK] Database seeding completed successfully!")
    finally:
        db.close()

if __name__ == "__main__":
    run_seed()
