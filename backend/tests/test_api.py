import sys
import os
from fastapi.testclient import TestClient

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["platform"] == "Shakti Yatra - Smart Pilgrimage Platform"
    assert data["developer"] == "Karan Yadav"

def test_destinations_list():
    response = client.get("/api/destinations")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    vindhyachal = next((d for d in data if d["slug"] == "vindhyachal"), None)
    assert vindhyachal is not None
    assert vindhyachal["state"] == "Uttar Pradesh"

def test_destination_detail_vindhyachal():
    response = client.get("/api/destinations/vindhyachal")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Vindhyachal"
    assert len(data["temples"]) >= 1
    assert len(data["attractions"]) >= 1
    assert len(data["emergency_contacts"]) >= 1

def test_search():
    response = client.get("/api/search?q=Vindh")
    assert response.status_code == 200
    data = response.json()
    assert data["count"] >= 1
    assert any("Vindhyachal" in r["title"] for r in data["results"])

def test_assistant():
    response = client.post("/api/assistant/chat", json={
        "message": "What are the timings for Maa Vindhyavasini temple?",
        "destination": "Vindhyachal"
    })
    assert response.status_code == 200
    data = response.json()
    assert "Mangala Aarti" in data["reply"]
    assert data["is_verified_knowledge"] is True

def test_itinerary_generation():
    response = client.post("/api/itinerary/generate", json={
        "destination": "Vindhyachal",
        "duration_days": 2,
        "travellers_count": 4,
        "has_elderly": True,
        "accessibility_mode": "Senior"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["duration_days"] == 2
    assert len(data["items"]) >= 5
    assert data["has_elderly"] is True

def test_emergency():
    response = client.get("/api/emergency?destination_slug=vindhyachal")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 3
    assert any(c["category"] == "Police" for c in data)

if __name__ == "__main__":
    print("[*] Running API tests...")
    test_root()
    test_destinations_list()
    test_destination_detail_vindhyachal()
    test_search()
    test_assistant()
    test_itinerary_generation()
    test_emergency()
    print("[OK] All 7 API tests passed with flying colors!")
