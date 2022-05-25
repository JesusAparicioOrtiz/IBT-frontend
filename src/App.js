import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import LandingPage from "./components/LandingPage";
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Profile from './components/Profile';
import UpdatePasswordForm from './components/UpdatePasswordForm';
import FQA from './components/FQA';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  // const [token, setToken] = useToken();
  // const [loginStatus, setLoginStatus] = useState(false);

  // if(!token) {
  //   return <LandingPage setToken={setToken} />
  // }


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signUp" element={<SignUpForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updatePassword" element={<UpdatePasswordForm />} />
          <Route path="/FQA/:id" element={<FQA />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
