from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.database import get_db
from app.models.user import User
from app.models.prediction import Prediction
from app.schemas.prediction import PredictionCreate, PredictionResponse

from ml.services import get_ai_prediction

router = APIRouter()


@router.post("/predict")
def predict(
    data: PredictionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    patient_data = {
        "age": data.age,
        "gender": data.gender,
        "bmi": data.bmi,
        "glucose": data.glucose,
        "blood_pressure": data.blood_pressure
    }

    ai_result = get_ai_prediction(patient_data)

    prediction = Prediction(
        age=data.age,
        gender=data.gender,
        bmi=data.bmi,
        glucose=data.glucose,
        blood_pressure=data.blood_pressure,
        predicted_disease=ai_result["predicted_disease"],
        confidence=ai_result["confidence"],
        user_id=current_user.id
    )

    db.add(prediction)
    db.commit()
    db.refresh(prediction)

    return {
        "message": "Prediction saved successfully",
        "prediction_id": prediction.id,
        "user": current_user.email,
        "predicted_disease": ai_result["predicted_disease"],
        "confidence": ai_result["confidence"],
        "reason": ai_result["reason"],
        "recommendation": ai_result["recommendation"]
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