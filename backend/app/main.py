from fastapi import FastAPI

from app.database.database import Base, engine
from app.models import User
from app.routes.user import router as user_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MediPredict AI",
    description="AI-powered Healthcare Predictive Analytics Platform",
    version="1.0.0"
)

app.include_router(user_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to MediPredict AI 🚀",
        "status": "Backend Running Successfully"
    }