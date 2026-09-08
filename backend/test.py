from ml.ai_engine import client, MODEL_NAME

response = client.chat.completions.create(
    model=MODEL_NAME,
    messages=[
        {
            "role": "user",
            "content": "Say Hello"
        }
    ]
)

print(response.choices[0].message.content)