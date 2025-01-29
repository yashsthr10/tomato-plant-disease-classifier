import React from "react";

export default function Predict({ predictedClass, imageSrc }) {

    const problem_solution_dict = {
        'Bacterial spot': {
            "problem": "A bacterial infection causes dark lesions on leaves, primarily affecting the stems and fruits. The infection spreads rapidly, especially in humid conditions, leading to crop loss.",
            "solution": "To manage bacterial spot, one can apply copper-based bactericides or antibiotics. Regularly removing infected plant debris and avoiding overhead watering to reduce moisture on leaves can help minimize bacterial spread. Crop rotation is also effective in reducing bacterial presence in the soil. Early detection and proper field sanitation practices, such as disinfecting tools, also help in preventing the spread of infection."
        },
        'Early blight': {
            "problem": "Early blight is a common fungal disease that causes dark, concentric spots with yellow halos on leaves. It leads to leaf yellowing, reduced photosynthesis, and premature leaf drop.",
            "solution": "The solution includes removing affected leaves to reduce the spread of the pathogen. Fungicides containing chlorothalonil or mancozeb can effectively control early blight. Ensure adequate plant spacing for air circulation and avoid excessive watering. Resistant varieties and practicing crop rotation help in managing and preventing this disease."
        },
        'Late blight': {
            "problem": "Late blight is a destructive fungal disease that can cause rapid rotting of leaves, stems, and fruits, especially in cool and wet conditions. It leads to large, dark lesions with white mold on the undersides.",
            "solution": "Control of late blight involves applying fungicides with systemic action, such as those containing metalaxyl or phosphorous acid. Removing and destroying infected plant material immediately can prevent further spread. It is also important to ensure proper drainage, reduce humidity in greenhouses, and use resistant plant varieties to minimize late blight damage."
        },
        'Leaf Mold': {
            "problem": "Leaf mold, caused by a fungal pathogen, results in the yellowing and eventual death of leaves. Affected leaves develop a moldy, yellowish appearance.",
            "solution": "Leaf mold can be controlled by pruning to improve airflow and prevent excess humidity. Fungicides such as chlorothalonil can help in managing the infection. Infected plants should be removed and destroyed to prevent the spread of spores. Growing resistant cultivars and practicing crop rotation can also minimize the incidence of leaf mold."
        },
        'Septoria leaf spot': {
            "problem": "Septoria leaf spot is a fungal disease that causes small, round spots with dark borders and light centers. It affects both older and younger leaves, leading to premature leaf drop.",
            "solution": "To manage septoria leaf spot, apply fungicides such as copper-based sprays or mancozeb. Regularly remove infected leaves and maintain good field sanitation. Watering the base of the plant and avoiding wetting the foliage helps in preventing the spread of the fungus. Crop rotation and resistant varieties can also provide long-term control."
        },
        'Spider mites Two-spotted spider mite': {
            "problem": "Spider mites, particularly the two-spotted spider mite, are tiny pests that suck out cell contents, causing leaf discoloration, curling, and eventual leaf drop.",
            "solution": "Control methods for spider mites include spraying plants with insecticidal soap or horticultural oils, which are effective in suffocating the pests. A natural predator, such as predatory mites, can also be introduced to control mite populations. Regularly spraying plants with water to wash off mites can also be an effective preventative measure. Ensure that plants are not stressed due to water shortages, as spider mites thrive under such conditions."
        },
        'Target Spot': {
            "problem": "Target spot is a fungal disease that manifests as small, circular, dark spots with a yellow margin. It causes premature leaf drop and can reduce crop yield.",
            "solution": "Management of target spot includes the use of fungicides such as chlorothalonil or azoxystrobin. Avoiding overhead irrigation helps reduce moisture on leaves, which prevents the spread of the pathogen. Sanitize tools and remove infected plant material to minimize the spread. Rotating crops and choosing resistant varieties can reduce the chances of recurring infections."
        },
        'Tomato Yellow Leaf Curl Virus': {
            "problem": "Tomato Yellow Leaf Curl Virus (TYLCV) causes severe yellowing, curling, and stunting of leaves. It is transmitted by whiteflies, leading to substantial yield loss.",
            "solution": "To prevent TYLCV, controlling whitefly populations is essential. Using insecticides targeting whiteflies, introducing biological control agents, or applying sticky traps can help reduce whitefly numbers. Infected plants should be removed and destroyed. Planting resistant tomato varieties and ensuring good field sanitation practices can also help mitigate the impact of TYLCV."
        },
        'Tomato mosaic virus': {
            "problem": "Tomato mosaic virus (ToMV) leads to mottled leaves with a mosaic pattern of light and dark green patches. The virus reduces photosynthetic activity, stunting plant growth.",
            "solution": "To control tomato mosaic virus, avoid mechanical transmission by sanitizing tools and equipment. Use resistant tomato varieties and remove infected plants immediately to prevent virus spread. Crop rotation with non-host plants and controlling aphid populations can further reduce the risk of ToMV."
        },
        'healthy': {
            "problem": "Healthy plants show robust growth, vibrant green leaves, and an absence of visible pests or diseases.",
            "solution": "Maintaining plant health involves providing the right growing conditions, including adequate light, water, and nutrients. Regularly inspecting plants for pests and diseases and applying appropriate preventive treatments, such as fungicides and insecticides, can keep plants healthy. Additionally, good soil management and practices like mulching and composting can promote healthy growth and enhance plant immunity."
        }
    }
    

    const renderContent = () => {
      if (!predictedClass || !problem_solution_dict[predictedClass]) {
        return <p>No information available for this class.</p>;
      }
  
      const { problem, solution } = problem_solution_dict[predictedClass];
  
      return (
        <>
          <h1>{predictedClass === "healthy" ? "Congratulations! Your plant is healthy!" : `The plant is suffering from: ${predictedClass}`}</h1>
          {predictedClass !== "healthy" && (
            <>
              <h2>Problem:</h2>
              <h6>{problem}</h6>
              <h2>Solution:</h2>
              <h6>{solution}</h6>
            </>
          )}
          {predictedClass === "healthy" && <p>{solution}</p>}
        </>
      );
    };


  return (
    <>
      <div className="predcontainer">
        <div>
          <img src={imageSrc} alt="Predicted" />
        </div>
        <div className="predTitle">{renderContent()}</div>
      </div>
    </>
  );
}