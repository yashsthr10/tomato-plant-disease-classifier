import React, { useState } from "react";

export default function Api() {


  const apiLink = "http://127.0.0.1:8000/predict/";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(apiLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="api-container">
      <h1>Try out our API for free:</h1>
      <div className="api-box">
        <span>{apiLink}</span>
        <button onClick={copyToClipboard}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
