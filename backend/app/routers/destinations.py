from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Destination, Temple
from app.schemas import DestinationSummarySchema, DestinationDetailSchema, TempleSchema

router = APIRouter(prefix="/destinations", tags=["Destinations"])

@router.get("", response_model=List[DestinationSummarySchema])
def list_destinations(db: Session = Depends(get_db)):
    """List all destinations, ordered by orbit order."""
    return db.query(Destination).order_by(Destination.orbit_order.asc()).all()

@router.get("/{slug}", response_model=DestinationDetailSchema)
def get_destination_detail(slug: str, db: Session = Depends(get_db)):
    """Fetch complete verified details for a specific destination."""
    dest = db.query(Destination).filter(Destination.slug == slug.lower()).first()
    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")
    return dest

@router.get("/{slug}/temples", response_model=List[TempleSchema])
def get_destination_temples(slug: str, db: Session = Depends(get_db)):
    """Fetch all temples for a destination."""
    dest = db.query(Destination).filter(Destination.slug == slug.lower()).first()
    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")
    return dest.temples
