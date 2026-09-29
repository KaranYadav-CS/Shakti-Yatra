from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional, List
from app.database import get_db
from app.models import Destination, Temple, Attraction, Hotel, Restaurant, Facility
from app.schemas import SearchResponseSchema, SearchResultItem

router = APIRouter(prefix="/search", tags=["Search"])

@router.get("", response_model=SearchResponseSchema)
def search_entities(
    q: str = Query(..., min_length=1, description="Search term"),
    category: Optional[str] = Query(None, description="Filter by category (all, temple, attraction, hotel, restaurant, facility)"),
    db: Session = Depends(get_db)
):
    query_term = f"%{q.strip()}%"
    results: List[SearchResultItem] = []

    cat = (category or "all").lower()

    # 1. Destinations
    if cat in ["all", "destination"]:
        destinations = db.query(Destination).filter(
            or_(
                Destination.name.ilike(query_term),
                Destination.state.ilike(query_term),
                Destination.district.ilike(query_term),
                Destination.short_description.ilike(query_term)
            )
        ).limit(5).all()
        for d in destinations:
            results.append(SearchResultItem(
                id=d.id,
                type="destination",
                title=d.name,
                subtitle=f"{d.district}, {d.state} • Siddhpeeth",
                category="Destination",
                url=f"/destinations/{d.slug}",
                image_url=d.hero_image,
                verified=d.verified
            ))

    # 2. Temples
    if cat in ["all", "temple"]:
        temples = db.query(Temple).filter(
            or_(
                Temple.name.ilike(query_term),
                Temple.deity.ilike(query_term),
                Temple.description.ilike(query_term)
            )
        ).limit(8).all()
        for t in temples:
            results.append(SearchResultItem(
                id=t.id,
                type="temple",
                title=t.name,
                subtitle=f"{t.deity} • {t.destination.name}",
                category="Temple",
                url=f"/destinations/{t.destination.slug}#temple-{t.id}",
                image_url=t.image_url,
                verified=t.verified
            ))

    # 3. Attractions
    if cat in ["all", "attraction"]:
        attractions = db.query(Attraction).filter(
            or_(
                Attraction.name.ilike(query_term),
                Attraction.category.ilike(query_term),
                Attraction.short_description.ilike(query_term)
            )
        ).limit(6).all()
        for a in attractions:
            results.append(SearchResultItem(
                id=a.id,
                type="attraction",
                title=a.name,
                subtitle=f"{a.category} • {a.distance_km} km away",
                category="Attraction",
                url=f"/destinations/{a.destination.slug}#attraction-{a.id}",
                image_url=a.image_url,
                verified=a.verified
            ))

    # 4. Hotels
    if cat in ["all", "hotel", "stay"]:
        hotels = db.query(Hotel).filter(
            or_(
                Hotel.name.ilike(query_term),
                Hotel.hotel_type.ilike(query_term),
                Hotel.address.ilike(query_term)
            )
        ).limit(5).all()
        for h in hotels:
            results.append(SearchResultItem(
                id=h.id,
                type="hotel",
                title=h.name,
                subtitle=f"{h.hotel_type} • {h.price_range} • {h.distance_from_temple}",
                category="Stay",
                url=f"/destinations/{h.destination.slug}#hotel-{h.id}",
                image_url=h.image_url,
                verified=h.verified
            ))

    # 5. Restaurants
    if cat in ["all", "restaurant", "food"]:
        restaurants = db.query(Restaurant).filter(
            or_(
                Restaurant.name.ilike(query_term),
                Restaurant.cuisine.ilike(query_term),
                Restaurant.specialty_dish.ilike(query_term)
            )
        ).limit(5).all()
        for r in restaurants:
            results.append(SearchResultItem(
                id=r.id,
                type="restaurant",
                title=r.name,
                subtitle=f"{r.cuisine} • {r.price_for_two}",
                category="Food",
                url=f"/destinations/{r.destination.slug}#restaurant-{r.id}",
                image_url=r.image_url,
                verified=r.verified
            ))

    # 6. Facilities
    if cat in ["all", "facility"]:
        facilities = db.query(Facility).filter(
            or_(
                Facility.name.ilike(query_term),
                Facility.category.ilike(query_term),
                Facility.location_details.ilike(query_term)
            )
        ).limit(5).all()
        for f in facilities:
            results.append(SearchResultItem(
                id=f.id,
                type="facility",
                title=f.name,
                subtitle=f"{f.category} • {f.distance}",
                category="Facility",
                url=f"/destinations/{f.destination.slug}#facilities",
                image_url=None,
                verified=f.verified
            ))

    return SearchResponseSchema(
        query=q,
        count=len(results),
        results=results
    )
