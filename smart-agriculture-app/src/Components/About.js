import React from "react";

function About() {
  return (
    <section
      style={{
        backgroundColor: "#f8f9fa", 
        padding: "50px 20px",
        textAlign: "center",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <h2 style={{ fontSize: "28px", color: "#343a40", fontWeight: "700" }}>
        About Tomato Plant Disease Prediction
      </h2>
      <p
        style={{
          fontSize: "18px",
          color: "#555",
          maxWidth: "800px",
          margin: "20px auto",
          lineHeight: "1.6",
        }}
      >
        Our deep learning model has been specifically trained to predict and
        classify 38 common diseases found in different plants. These diseases were
        carefully selected based on their widespread impact on crop
        production. The model takes an image of a plant leaf, processes it,
        and predicts which disease is likely to affect the plant. Our model helps
        farmers and gardeners quickly identify plant diseases and take necessary
        action to prevent the spread of infections with the help of AI.
      </p>
      <p
        style={{
          fontSize: "16px",
          color: "#777",
          maxWidth: "800px",
          margin: "0 auto 30px",
          lineHeight: "1.6",
        }}
      >
        The model is based on a Finetuned resnet50 model, which allows
        it to learn patterns and features from images to make accurate predictions.
        It classifies the plant diseases into one of the 38 categories, including
        but not limited to common diseases like Tomato Leaf Mold, Early Blight, and
        Fusarium Wilt.
      </p>
      <h3 style={{ fontSize: "22px", color: "#343a40", fontWeight: "600" }}>
        How It Works:
      </h3>
      <p
        style={{
          fontSize: "16px",
          color: "#555",
          maxWidth: "800px",
          margin: "10px auto",
          lineHeight: "1.6",
        }}
      >
        1. **Input Image:** The user provides an image of a plant leaf.<br />
        2. **Image Processing:** The model preprocesses the image to extract relevant features.<br />
        3. **Disease Classification:** The Model classifies the image into one of the 38 disease categories.<br />
        4. **Prediction Result:** The model returns the predicted disease and confidence level.
      </p>
    </section>
  );
}

export default About;
