from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.routers import (
    destinations, search, services, emergency,
    itinerary, assistant, auth, my_yatra, admin, places
)

# Ensure tables are initialized
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Shakti Yatra - Smart Pilgrimage Platform API",
    description=(
        "Backend REST API for Shakti Yatra: Smart Pilgrimage Assistance Platform. "
        "Developed by Karan Yadav. First Destination: Vindhyachal, Uttar Pradesh, India."
    ),
    version=settings.PROJECT_VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration - supports both exact origins and localhost ports without browser wildcard conflicts
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers under /api
app.include_router(destinations.router, prefix="/api")
app.include_router(places.router, prefix="/api")
app.include_router(search.router, prefix="/api")
app.include_router(services.router, prefix="/api")
app.include_router(emergency.router, prefix="/api")
app.include_router(itinerary.router, prefix="/api")
app.include_router(assistant.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
app.include_router(my_yatra.router, prefix="/api")
app.include_router(admin.router, prefix="/api")

@app.get("/")
def root():
    return {
        "platform": "Shakti Yatra - Smart Pilgrimage Platform",
        "tagline": "Discover. Plan. Experience.",
        "developer": "Karan Yadav",
        "first_destination": "Vindhyachal, Uttar Pradesh",
        "status": "online",
        "api_docs": "/docs",
        "version": settings.PROJECT_VERSION
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "database": "connected"
    }
