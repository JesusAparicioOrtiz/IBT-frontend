import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Profile from './components/Profile';
import UpdatePasswordForm from './components/UpdatePasswordForm';
import FQA from './components/FQA';
import Map from "./components/Map";
import CityForm from './components/CityForm';
import UserCities from './components/UserCities';
import Account from './components/Account';
import ForumSearch from './components/ForumSearch';
import Forum from './components/Forum';
import QuestionForm from './components/QuestionForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signUp" element={<SignUpForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<Account />} />
          <Route path="/updatePassword" element={<UpdatePasswordForm />} />
          <Route path="/FQA/:id" element={<FQA />} />
          <Route path="/map" element={<Map />} />
          <Route path="/addCity" element={<CityForm />} />
          <Route path="/userCities" element={<UserCities />} />
          <Route path="/forumSearch" element={<ForumSearch />} />
          <Route path="/forum/:id" element={<Forum />} />
          <Route path="/forum/addquestion/:id" element={<QuestionForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
