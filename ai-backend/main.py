from fastapi import FastAPI
from app.chat_router import router as chat_router

app = FastAPI()

# Include the chat router for AI assistant endpoints
app.include_router(chat_router, prefix="/chat", tags=["chat"])

@app.get("/")
def root():
    return {"message": "AI Assistant Backend is running"}
