import json

from ml.ai_engine import client, MODEL_NAME
from ml.prompts import MEDICAL_SYSTEM_PROMPT


def get_ai_prediction(patient_data: dict):

    prompt = f"""
{MEDICAL_SYSTEM_PROMPT}

Patient Data:

{json.dumps(patient_data, indent=2)}

Return ONLY valid JSON.
"""

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content": "You are a professional medical AI assistant.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.3,
    )

    text = response.choices[0].message.content.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()
    elif text.startswith("```"):
        text = text.replace("```", "").strip()

    return json.loads(text)