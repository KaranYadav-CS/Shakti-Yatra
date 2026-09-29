from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import Hotel, Restaurant, Facility, TransportPoint
from app.schemas import HotelSchema, RestaurantSchema, FacilitySchema, TransportPointSchema

router = APIRouter(prefix="/services", tags=["Services"])

@router.get("/hotels", response_model=List[HotelSchema])
def list_hotels(
    destination_id: Optional[int] = None,
    wheelchair_accessible: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Hotel)
    if destination_id:
        query = query.filter(Hotel.destination_id == destination_id)
    if wheelchair_accessible is not None:
        query = query.filter(Hotel.wheelchair_accessible == wheelchair_accessible)
    return query.all()

@router.get("/restaurants", response_model=List[RestaurantSchema])
def list_restaurants(
    destination_id: Optional[int] = None,
    pure_veg_only: bool = True,
    db: Session = Depends(get_db)
):
    query = db.query(Restaurant)
    if destination_id:
        query = query.filter(Restaurant.destination_id == destination_id)
    if pure_veg_only:
        query = query.filter(Restaurant.is_pure_veg == True)
    return query.all()

@router.get("/facilities", response_model=List[FacilitySchema])
def list_facilities(
    destination_id: Optional[int] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Facility)
    if destination_id:
        query = query.filter(Facility.destination_id == destination_id)
    if category:
        query = query.filter(Facility.category.ilike(f"%{category}%"))
    return query.all()

@router.get("/transport", response_model=List[TransportPointSchema])
def list_transport(
    destination_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    query = db.query(TransportPoint)
    if destination_id:
        query = query.filter(TransportPoint.destination_id == destination_id)
    return query.all()
