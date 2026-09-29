from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "Shakti Yatra API"
    PROJECT_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEVELOPER: str = "Karan Yadav"
    SECRET_KEY: str = "shakti-yatra-secret-key-development-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # SQLite by default, Postgres if provided
    DATABASE_URL: str = "sqlite:///./shakti_yatra.db"
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ]
    
    # Google Maps / Places API Key (optional, platform has verified fallback)
    GOOGLE_MAPS_API_KEY: str = os.getenv("GOOGLE_MAPS_API_KEY", "")
    
    # Optional LLM API keys
    GEMINI_API_KEY: str = ""
    OPENAI_API_KEY: str = ""

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
