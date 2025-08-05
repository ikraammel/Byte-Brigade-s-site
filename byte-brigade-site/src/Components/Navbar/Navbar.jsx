import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { setOfflineStatus } from "../Firebase/UserStatus"; 
import './style.css';

export default function Navbar() {
  const { currentUser, setCurrentUser, darkMode, setDarkMode } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1120);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1120);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = async () => {
    if (currentUser) {
      await setOfflineStatus(currentUser.uid);
      setCurrentUser(null);
      localStorage.removeItem("user");
      window.location.reload();
    }
  };

  return (
    <nav className={`navbar navbar-expand-xxl ${darkMode ? "navbar-dark" : "navbar-light"} navbar-custom px-4 ${darkMode ? "dark-mode" : ""}`}>
      <Link className="navbar-brand" to="/">
        <img src="logo1.png" alt="logo" height="50" className="me-2" />
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
          {/* Liens du menu */}
          <li className="nav-item">
            <Link className="nav-link" to="/cours">Cours</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/activites">Activités</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/membres">Nos membres</Link>
          </li>

          {/* Contenu conditionnel utilisateur */}
          {currentUser ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  👤 {currentUser.prenom || currentUser.displayName || "Profil"}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              {currentUser.role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">⚙️ Admin</Link>
                </li>
              )}
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Se connecter</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">S'inscrire</Link>
              </li>
            </>
          )}

          {currentUser && (
            <>
              <li className="nav-item">
                <button
                  className="btn btn-danger nav-link"
                  onClick={handleLogout}
                >
                  Déconnexion
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-secondary nav-link"
                  onClick={toggleTheme}
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}