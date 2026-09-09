from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.user import router as user_router
from app.routes.prediction import router as prediction_router

app = FastAPI(
    title="MediPredict AI",
    description="AI-powered Healthcare Predictive Analytics Platform",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(prediction_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to MediPredict AI"
    }