from fastapi import APIRouter
from app.schemas import AssistantChatRequest, AssistantChatResponse
from app.services.assistant_ai import process_assistant_chat

router = APIRouter(prefix="/assistant", tags=["Shakti AI Assistant"])

@router.post("/chat", response_model=AssistantChatResponse)
async def chat_with_assistant(req: AssistantChatRequest):
    """Interact with Shakti AI Pilgrimage Assistant, grounded in verified facts."""
    return await process_assistant_chat(req)
