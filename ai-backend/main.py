from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.chat_router import router as chat_router

app = FastAPI()

# Enable CORS for your React frontend (assuming it's running on localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow React frontend to access the backend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods like GET, POST, OPTIONS
    allow_headers=["*"],  # Allow all headers
)

# Include the chat router for AI assistant endpoints
app.include_router(chat_router, prefix="/chat", tags=["chat"])

@app.get("/")
def root():
    return {"message": "AI Assistant Backend is running"}
