import React from "react";
import Navigation from "./components/Shared/Navigation";
import Footer from "./components/Shared/Footer";
import Main from "./components/Main";
import Toastr from "./components/Shared/Toastr";

function App() {
  return (
    <>
      <Navigation/>
      <Main/>
      <Footer/>
      <Toastr/>
    </>    
  );
}

export default App;