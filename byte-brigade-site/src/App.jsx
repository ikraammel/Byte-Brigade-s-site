import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './Components/HomePage/Home'
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/Login/Login'
import Membres from "./Components/MembresBureau/Membres";
import Register from "./Components/Register/Register";
import Admin from "./Components/Admin/Admin";
import ConsulterCours from "./Components/ConsulterCours/ConsulterCours";
import Profile from "./Components/Profile/Profile";
import ProtectedRouteAdmin from "./Components/ProtectRoute/ProtectedRouteAdmin";
import ProtectProfile from "./Components/ProtectRoute/ProtectProfile";
import ResetPassword from "./Components/Login/ResetPassword";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/membres" element={<Membres/>} />
        <Route path="/admin" element={
                          <ProtectedRouteAdmin> 
                            <Admin/>
                          </ProtectedRouteAdmin>} />
        <Route path="/cours" element={
                            <ProtectProfile>
                              <ConsulterCours />
                            </ProtectProfile>
                          } />
        <Route path="/profile" element={
                          <ProtectProfile> 
                            <Profile/>
                          </ProtectProfile>} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  )
}

export default App
