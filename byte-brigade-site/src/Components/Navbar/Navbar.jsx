import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom px-4">
      <Link className="navbar-brand" to="/">
        <img src="logo.PNG" alt="logo" height="40" className="me-2" />
        Byte Brigade
      </Link>

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
            <Link className="nav-link" to="/cours">Cours</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/activites">Activités</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/membres">Nos membres du bureau</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Se connecter</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">S'inscrire</Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-secondary ms-3" onClick={toggleTheme}>
              {darkMode ? "☀️ Mode clair" : "🌙 Mode sombre"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
