import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './Components/HomePage/Home'
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/Login/Login'
import Membres from "./Components/MembresBureau/Membres";
import Register from "./Components/Register/Register";
import Admin from "./Components/Admin/Admin";
import ListeCours from "./Components/ListeCours/ListeCours";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/membres" element={<Membres/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/cours" element={<ListeCours/>} />
      </Routes>
    </Router>
  )
}

export default App
