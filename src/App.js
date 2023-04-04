import React, { useState, useEffect } from 'react';
import Navigation from "./components/Shared/Navigation";
import Footer from "./components/Shared/Footer";
import Main from "./components/Main";
import Toastr from "./components/Shared/Toastr";
import { AuthContext } from './components/Contexts/AuthContext';
import { editUser, logInUser, logOutUser, registerUser } from './services/usersService';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function App() {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setLoading(false);
      setAuth(user || {});
    });

    return () => unsubscribe();
  }, []);

  const onLoginSubmit = async (data) => {    
    await logInUser(data,navigate);
  };

  const onRegisterSubmit = async (values) => {    
    await registerUser(values, navigate);
  };

  function isUserLogged() {
    return !!auth.uid;
  };

  function logOut(){
    logOutUser(navigate);
  }

  const contextValues = {
    onLoginSubmit,
    onRegisterSubmit,
    isUserLogged,
    logOut,
    dxaUser: auth,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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