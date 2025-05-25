import React ,{useState} from "react";
import axios from 'axios';


export default function Predict({ predictedClass, imageSrc }) {
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [result, setResult] = useState("");

  // for debugging purpose
  // console.log(predictedClass)

  async function handle_askAi() {
  const llm_url = "http://fastapi:9000/askAI"; // adjust if port or path differs

  setLoading(true);
  setShowButton(false);

  try {
    const response = await axios.post(
      llm_url,
      {
        text: predictedClass // this should be a string, like "Potato___Early_blight"
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setResult(response.data.response);
    // console.log("AI Response:", response.data.response);

  } catch (error) {
      setResult(
        "Oops! Something went wrong. Probably the AI passed out from too much data."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
}


  const renderContent = () => {
  
      return (
        <>
          <h1>{predictedClass === "Healthy" ? "Your plant is healthy!" : `The plant is suffering from ${predictedClass}`}</h1>
          {predictedClass !== "Healthy" && (
            <>
            
          {showButton && (
            <h1>
              <button onClick={handle_askAi} className="askai">Ask AI</button>
            </h1>

          )}   

          {loading && <p>Wait!, AI is thinking... 🌱🤔</p>}

      {result && (
        <p
          style={{
            marginTop: "1rem",
            background: "#f0f0f0",
            padding: "1rem",
            borderRadius: "8px",
            whiteSpace: "pre-wrap"
          }}
        >
          <strong>AI says:</strong> {result}
        </p>
      )}

            </>
          )}
          {/* {predictedClass === "healthy" && <p>{solution}</p>} */}
        </>
      );
    };


  return (
    <>
      <div className="predcontainer">
        <div>
          <img src={imageSrc} alt="Predicted" style={{ width: "300px", height: "auto" }} />
        </div>
        <div className="predTitle">{renderContent()}</div>
      </div>
    </>
  );
}