from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import requests
from io import BytesIO
import re
from LLM_support import call_llm
from pydantic import BaseModel
from prometheus_fastapi_instrumentator import Instrumentator



app = FastAPI(
    title="Crop Disease Proxy",
    description="Proxy FastAPI server for TorchServe model inference",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Lock down in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# setting up prometheus for fastapi monitoring
instrumentator = Instrumentator().instrument(app).expose(app)

class QueryRequest(BaseModel):
    text: str

def clean_label(text):
    # Replace underscores and parentheses with spaces
    text = re.sub(r'___|__|_', ' ', text)
    text = re.sub(r'[\(\)]', '', text)
    
    # Fix double spaces and capitalize nicely
    text = re.sub(r'\s+', ' ', text).strip()
    return text.title()


# TorchServe inference URL
TORCHSERVE_URL = "http://model-server:8080/predictions/model" # Replace with your model name

@app.post("/predict/")
async def predict_image(file: UploadFile = File(...)):
    try:
        if not file.content_type or not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Uploaded file is not an image.")

        # Read image
        image_bytes = await file.read()

        # Forward to TorchServe
        response = requests.post(
            TORCHSERVE_URL,
            files={"data": ("filename", image_bytes, file.content_type)}
        )

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)

        response = response.json()

        response['predicted_class'] = clean_label(response['predicted_class'])
        print(response['predicted_class'])
        return JSONResponse(content=response)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during prediction: {str(e)}")



@app.post("/askAI")
async def ask_ai(query : QueryRequest):
    try:
        response = call_llm(query.text)
        return {"response": response}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM had a meltdown: {str(e)}")
