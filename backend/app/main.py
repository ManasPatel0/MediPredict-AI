from fastapi import FastAPI

app = FastAPI(
    title="MediPredict AI",
    description="AI-powered Healthcare Predictive Analytics Platform",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to MediPredict AI 🚀",
        "status": "Backend Running Successfully"
    }