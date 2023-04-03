import App from './App';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import "./style.css";

import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <App />
  </BrowserRouter>
    
);