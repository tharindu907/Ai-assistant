from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.langchain_service import generate_response

router = APIRouter()

# Request model for chat
class ChatRequest(BaseModel):
    message: str

# Response model for chat
class ChatResponse(BaseModel):
    response: str

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        response_text = generate_response(request.message)
        return ChatResponse(response=response_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
