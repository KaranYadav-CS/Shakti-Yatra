from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Dict, Any, List
from app.database import get_db
from app.models import Destination, Temple, Attraction, Hotel, Restaurant, Facility, EmergencyContact
from app.schemas import AdminStatsSchema, VerificationUpdateRequest

router = APIRouter(prefix="/admin", tags=["Admin Operations"])

@router.get("/stats", response_model=AdminStatsSchema)
def get_admin_dashboard_stats(db: Session = Depends(get_db)):
    total_dest = db.query(Destination).count()
    total_temples = db.query(Temple).count()
    total_attractions = db.query(Attraction).count()
    total_hotels = db.query(Hotel).count()
    total_restaurants = db.query(Restaurant).count()
    total_facilities = db.query(Facility).count()
    total_emergency = db.query(EmergencyContact).count()
    
    total_services = total_hotels + total_restaurants + total_facilities

    # Check unverified items
    unverified_temples = db.query(Temple).filter(Temple.verified == False).count()
    unverified_attractions = db.query(Attraction).filter(Attraction.verified == False).count()
    unverified_emergency = db.query(EmergencyContact).filter(EmergencyContact.verified == False).count()
    pending_count = unverified_temples + unverified_attractions + unverified_emergency

    total_records = total_dest + total_temples + total_attractions + total_services + total_emergency
    verified_records = total_records - pending_count
    percentage = (verified_records / total_records * 100.0) if total_records > 0 else 100.0

    return AdminStatsSchema(
        total_destinations=total_dest,
        total_temples=total_temples,
        total_attractions=total_attractions,
        total_services=total_services,
        total_emergency_contacts=total_emergency,
        pending_verification_count=pending_count,
        verified_percentage=round(percentage, 1)
    )

@router.post("/verify")
def update_verification_status(req: VerificationUpdateRequest, db: Session = Depends(get_db)):
    table_map = {
        "temple": Temple,
        "attraction": Attraction,
        "hotel": Hotel,
        "restaurant": Restaurant,
        "facility": Facility,
        "emergency": EmergencyContact,
        "destination": Destination
    }
    model_class = table_map.get(req.entity_type.lower())
    if not model_class:
        raise HTTPException(status_code=400, detail=f"Invalid entity type: {req.entity_type}")

    item = db.query(model_class).filter(model_class.id == req.entity_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Entity not found")

    item.verified = req.verified
    if req.source_name:
        item.source_name = req.source_name
    if req.source_url:
        item.source_url = req.source_url
    item.last_verified_at = datetime.utcnow().strftime("%Y-%m-%d")

    db.commit()
    return {
        "status": "success",
        "message": f"Successfully updated verification for {req.entity_type} #{req.entity_id}",
        "verified": item.verified,
        "last_verified_at": item.last_verified_at
    }
