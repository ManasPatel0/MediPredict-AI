from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)

    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)
    bmi = Column(Float, nullable=False)
    glucose = Column(Float, nullable=False)
    blood_pressure = Column(Float, nullable=False)

    predicted_disease = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User")