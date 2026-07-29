from pydantic import BaseModel


class PredictionCreate(BaseModel):
    age: int
    gender: str
    bmi: float
    glucose: float
    blood_pressure: float


class PredictionResponse(BaseModel):
    id: int
    age: int
    gender: str
    bmi: float
    glucose: float
    blood_pressure: float
    predicted_disease: str
    confidence: float

    class Config:
        from_attributes = True