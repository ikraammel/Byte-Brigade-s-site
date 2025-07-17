import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [darkMode,setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark"){
      setDarkMode(true)
      document.body.classList.add("dark-mode")
    }
  },[darkMode])

  const setTheme = () => {
    setDarkMode(!darkMode)
    localStorage.setItem("theme",!darkMode ? "dark"  : "light")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom px-4">
      <Link className="navbar-brand" to="/">
        <img src="logo.PNG" alt="logo" height="40" className="me-2" />
        Byte Brigade
      </Link>

        {/* Bouton hamburger */}
        <button 
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className={`nav-link ${darkMode ? "dark-mode" : ""}`} href="/cours">Cours</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${darkMode ? "dark-mode" : ""}`} href="/activites">Activités</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${darkMode ? "dark-mode" : ""}`} href="/membres">Nos membres du bureau</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${darkMode ? "dark-mode" : ""}`} href="/login">Se connecter</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${darkMode ? "dark-mode" : ""}`} href="/register">S'inscrire</a>
          </li>
          <li className="nav-item">
            <button className="btn btn-secondary ms-3" onClick={setTheme}>
              {darkMode ? "☀️ Mode clair" : "🌙 Mode sombre"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );  
}
