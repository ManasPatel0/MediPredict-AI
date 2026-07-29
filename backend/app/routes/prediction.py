from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.database import get_db
from app.models.user import User
from app.models.prediction import Prediction
from app.schemas.prediction import PredictionCreate, PredictionResponse

router = APIRouter()


@router.post("/predict")
def predict(
    data: PredictionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    prediction = Prediction(
        age=data.age,
        gender=data.gender,
        bmi=data.bmi,
        glucose=data.glucose,
        blood_pressure=data.blood_pressure,
        predicted_disease="Diabetes",
        confidence=0.94,
        user_id=current_user.id
    )

    db.add(prediction)
    db.commit()
    db.refresh(prediction)

    return {
        "message": "Prediction saved successfully",
        "prediction_id": prediction.id,
        "user": current_user.email,
        "predicted_disease": prediction.predicted_disease,
        "confidence": prediction.confidence
    }


@router.get("/history", response_model=List[PredictionResponse])
def prediction_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    predictions = (
        db.query(Prediction)
        .filter(Prediction.user_id == current_user.id)
        .all()
    )

    return predictions