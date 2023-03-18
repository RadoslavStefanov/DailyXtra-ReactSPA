import {Routes, Route} from "react-router-dom"

import React from "react";
import Navigation from "./components/Shared/Navigation";
import Footer from "./components/Shared/Footer";
import Main from "./components/Main";

function App() {
  return (
    <>
      <Navigation/>
      <Main/>
      <Footer/>
    </>    
  );
}

export default App;