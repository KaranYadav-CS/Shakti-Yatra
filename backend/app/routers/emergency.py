from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import EmergencyContact, Destination
from app.schemas import EmergencyContactSchema

router = APIRouter(prefix="/emergency", tags=["Emergency Assistance"])

@router.get("", response_model=List[EmergencyContactSchema])
def get_emergency_contacts(
    destination_slug: Optional[str] = Query("vindhyachal", description="Destination slug"),
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(EmergencyContact)
    if destination_slug:
        dest = db.query(Destination).filter(Destination.slug == destination_slug.lower()).first()
        if dest:
            query = query.filter(EmergencyContact.destination_id == dest.id)
    if category:
        query = query.filter(EmergencyContact.category.ilike(f"%{category}%"))
    
    contacts = query.order_by(EmergencyContact.priority.asc()).all()
    return contacts
