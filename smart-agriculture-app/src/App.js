import React, { useState } from "react";
import './App.css';
import NavigationBar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Components/Footer';
import About from './Components/About';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Mid from './Components/Mid';
import Api from './Components/Api';
import Predict from './Components/Predict';

function App() {

  const [predictedClass, setPredictedClass] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  return (
    <Router>
      <div>
        <NavigationBar/>
        <div className="main-content">
        <Routes>
          <Route path="/" element={<><Mid setPredictedClass={setPredictedClass} setImageSrc={setImageSrc}/> <Api/></>} />
          <Route path="/about" element={<About />} />
          <Route path='/predictImage' element={<Predict predictedClass={predictedClass} imageSrc={imageSrc}/>}/>
        </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
