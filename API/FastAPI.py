from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


model = load_model('crop_disease_fine_tuned_model.h5')

@app.post("/predict/")
async def predict_image(file: UploadFile = File(...)):
    try:
        
        print(f"File content type: {file.content_type}")
        if not file.content_type or not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File is not an image.")

        #Read and process the image
        contents = await file.read()
        img = load_img(BytesIO(contents), target_size=(224, 224))  # Resize image
        img_array = img_to_array(img) / 255.0  # Normalize image
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

        predictions = model.predict(img_array)
        predicted_class = int(np.argmax(predictions))  # Get the predicted class

        return JSONResponse(
            content={
                "predicted_class": predicted_class,
                "confidence_scores": predictions.tolist()  # Return all confidence scores
            }
        )
    except Exception as e:
       
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

