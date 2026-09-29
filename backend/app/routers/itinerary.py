from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Itinerary, ItineraryItem
from app.schemas import ItineraryCreateRequest, ItineraryResponseSchema
from app.services.itinerary_generator import generate_itinerary

router = APIRouter(prefix="/itinerary", tags=["Yatra Planner"])

@router.post("/generate", response_model=ItineraryResponseSchema)
def generate_custom_itinerary(req: ItineraryCreateRequest):
    """Generate dynamic structured pilgrimage itinerary with accessibility adaptation."""
    return generate_itinerary(req)

@router.post("/save", response_model=ItineraryResponseSchema)
def save_itinerary(plan: ItineraryResponseSchema, db: Session = Depends(get_db)):
    """Save an itinerary to the database."""
    itinerary = Itinerary(
        title=plan.title,
        destination_name=plan.destination_name,
        duration_days=plan.duration_days,
        travellers_count=plan.travellers_count,
        has_elderly=plan.has_elderly,
        has_children=plan.has_children,
        accessibility_mode=plan.accessibility_mode,
        budget=plan.budget,
        notes=plan.notes,
        ai_generated=plan.ai_generated
    )
    db.add(itinerary)
    db.commit()
    db.refresh(itinerary)

    for item in plan.items:
        db_item = ItineraryItem(
            itinerary_id=itinerary.id,
            day_number=item.day_number,
            order_index=item.order_index,
            time_slot=item.time_slot,
            title=item.title,
            description=item.description,
            location_name=item.location_name,
            activity_type=item.activity_type,
            accessibility_tip=item.accessibility_tip
        )
        db.add(db_item)
    db.commit()
    db.refresh(itinerary)

    return itinerary

@router.get("/{id}", response_model=ItineraryResponseSchema)
def get_itinerary(id: int, db: Session = Depends(get_db)):
    itinerary = db.query(Itinerary).filter(Itinerary.id == id).first()
    if not itinerary:
        raise HTTPException(status_code=404, detail="Itinerary not found")
    return itinerary
