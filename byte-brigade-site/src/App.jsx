import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './Components/HomePage/Home'
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/Login/Login'
import Membres from "./Components/MembresBureau/Membres";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/membres" element={<Membres/>} />
      </Routes>
    </Router>
  )
}

export default App
