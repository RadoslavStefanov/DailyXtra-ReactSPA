import React, { useState } from 'react';
import Navigation from "./components/Shared/Navigation";
import Footer from "./components/Shared/Footer";
import Main from "./components/Main";
import Toastr from "./components/Shared/Toastr";

import { AuthContext } from './components/Contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { logInUser, registerUser } from './services/usersService';
import { getAuth } from "firebase/auth";


function App() {

  const [auth, setAuth] = useState({});

  const onLoginSubmit = async (data) => {
    try {
        const result = await logInUser(data);

        setAuth(result);

        Navigate('/');
    } catch (error) {
        console.log('There is a problem');
    }
  };

  const onRegisterSubmit = async (values) => {
    try
    {
      registerUser(values);
      Navigate('/');
    }
    catch (error) {
      console.log(error);
    }
  };

  function isUserLogged()  
  {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      contextValues.dxaUser = user;
      return true;
    } 
    else {
      contextValues.dxaUser = null;
      return false;
    }
  };

  let contextValues = {
    onLoginSubmit,
    onRegisterSubmit,
    isUserLogged,
    dxaUser: null,
    //onLogout,
    //userId: auth._id,
    //token: auth.accessToken,
    //userEmail: auth.email,
    //isAuthenticated: !!auth.accessToken,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      <Navigation/>
      <Main/>
      <Footer/>
      <Toastr/>
    </AuthContext.Provider>      
  );
}

export default App;