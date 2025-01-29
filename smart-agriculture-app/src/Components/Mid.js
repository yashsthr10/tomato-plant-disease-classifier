import React, { useState, useRef, useEffect } from "react";
import "../App.css";
import camera from "../img/camera.png";
import upload from "../img/upload.png";
import { Link } from "react-router-dom";
import axios from "axios";

function Mid({ setPredictedClass, setImageSrc }) {
  // setting our hooks
  const [localimageSrc, setLocalImageSrc] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCameraCaptured, setIsCameraCaptured] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // creating the necessary functions that adds functionality to our page
  const startCamera = () => {
    setIsCameraActive(true);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setIsCameraCaptured(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const capturedImage = canvas.toDataURL("image/png");
      setLocalImageSrc(capturedImage);
      setImageSrc(capturedImage);
      setIsCameraCaptured(true);
      stopCamera();
    }
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalImageSrc(reader.result);
        setImageSrc(reader.result);
        setIsCameraCaptured(false);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isCameraActive) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
        });
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [isCameraActive]);


  // using FastApi endpoint to get predictions from the model 
  const predict_btn = async () => {
    const url = "http://127.0.0.1:8000/predict/";

    const data = [
      ["Bacterial spot", 0],
      ["Early blight", 1],
      ["Late blight", 2],
      ["Leaf Mold", 3],
      ["Septoria leaf_spot", 4],
      ["Spider mites Two-spotted spider mite", 5],
      ["Target Spot", 6],
      ["Tomato Yellow Leaf Curl Virus", 7],
      ["Tomato mosaic virus", 8],
      ["healthy", 9],
    ];
    const indexToClass = Object.fromEntries(
      data.map(([name, idx]) => [idx, name])
    );

    try {
    
      const blob = await fetch(localimageSrc).then((res) => res.blob());

      
      const formData = new FormData();
      formData.append("file", blob, "image.jpg");

      
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      
      const predictedClass = response.data.predicted_class;
      let prediction = indexToClass[predictedClass];
      setPredictedClass(prediction);

      console.log("Prediction:", prediction);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const retakePhoto = () => {
    setImageSrc(null);
    setIsCameraCaptured(false);
  };

  return (
    <>
      <div className="Mid">
        <h1 className="heading">Take a Photo or Upload from Device</h1>
        <div className="InputContainer">
          <div className="InputBox">
            <button onClick={startCamera}>
              <img src={camera} alt="Camera" />
            </button>
            <h1>Camera</h1>
          </div>
          <div className="InputBox">
            <button
              onClick={() => document.getElementById("fileInput").click()} 
              
            >
              <img src={upload} alt="Upload" style={{ cursor: "pointer" }} />
            </button>
            <h1>Upload</h1>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleUpload}
              style={{ display: "none" }} 
            />
          </div>
        </div>
        <div className="preview">
          {isCameraActive && !localimageSrc && (
            <div>
              <h2>Camera Preview:</h2>
              <video
                ref={videoRef}
                style={{
                  width: "300px",
                  height: "auto",
                  border: "2px solid black",
                  borderRadius: "8px",
                }}
                playsInline
                muted
              ></video>
              <button onClick={capturePhoto}>Capture</button>
              <button onClick={stopCamera}>Close</button>
            </div>
          )}
          {localimageSrc && (
            <div>
              <h2>Preview:</h2>
              <img
                src={localimageSrc}
                alt="Uploaded or Captured"
                style={{ width: "300px", height: "auto" }}
              />
              {isCameraCaptured && (
                <button onClick={retakePhoto}>Take Again</button>
              )}
              <button className="upload-btn" onClick={predict_btn}>
                <Link
                  to="/predictImage"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Predict
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Mid;
