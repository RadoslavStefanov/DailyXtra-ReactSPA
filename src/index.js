import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";

import { setUpFireBase } from './sysInfo/secrets';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <App />
  </BrowserRouter>
    
);

setUpFireBase();