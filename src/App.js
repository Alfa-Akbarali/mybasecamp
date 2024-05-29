import React, {useState, useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import Login from '../src/components/login/login_card'
import Home from "./components/home/Home";
import SignUp from "./components/signup/signUp";
import {auth} from "./firebase"


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUser(userAuth);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Routes>
      <Route path="/home" element={user ? <Home/> : <Login/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
  );
}

export default App;
