from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import User, SavedPlace, Itinerary
from app.schemas import SavedPlaceSchema, SavedPlaceCreate, ItineraryResponseSchema
from app.routers.auth import get_current_user

router = APIRouter(prefix="/my-yatra", tags=["My Yatra"])

@router.get("/saved-places", response_model=List[SavedPlaceSchema])
def list_saved_places(user: Optional[User] = Depends(get_current_user), db: Session = Depends(get_db)):
    if not user:
        # Return empty list for guest sessions
        return []
    return db.query(SavedPlace).filter(SavedPlace.user_id == user.id).all()

@router.post("/saved-places", response_model=SavedPlaceSchema)
def save_place(data: SavedPlaceCreate, user: Optional[User] = Depends(get_current_user), db: Session = Depends(get_db)):
    if not user:
        raise HTTPException(status_code=401, detail="Please log in to save places to My Yatra")
    
    existing = db.query(SavedPlace).filter(
        SavedPlace.user_id == user.id,
        SavedPlace.place_type == data.place_type,
        SavedPlace.place_id == data.place_id
    ).first()
    if existing:
        return existing
    
    saved = SavedPlace(
        user_id=user.id,
        place_type=data.place_type,
        place_id=data.place_id,
        place_name=data.place_name,
        place_image=data.place_image,
        notes=data.notes
    )
    db.add(saved)
    db.commit()
    db.refresh(saved)
    return saved

@router.delete("/saved-places/{place_id}")
def remove_saved_place(place_id: int, user: Optional[User] = Depends(get_current_user), db: Session = Depends(get_db)):
    if not user:
        raise HTTPException(status_code=401, detail="Please log in")
    item = db.query(SavedPlace).filter(SavedPlace.id == place_id, SavedPlace.user_id == user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Saved place not found")
    db.delete(item)
    db.commit()
    return {"status": "success", "message": "Place removed from My Yatra"}

@router.get("/itineraries", response_model=List[ItineraryResponseSchema])
def list_user_itineraries(user: Optional[User] = Depends(get_current_user), db: Session = Depends(get_db)):
    if not user:
        return db.query(Itinerary).order_by(Itinerary.created_at.desc()).limit(3).all()
    return db.query(Itinerary).filter(Itinerary.user_id == user.id).all()
