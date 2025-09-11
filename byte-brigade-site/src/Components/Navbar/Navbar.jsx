import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { setOfflineStatus } from "../Firebase/UserStatus"; 
import './style.css';

export default function Navbar() {
  const { currentUser, setCurrentUser, darkMode, setDarkMode } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1120);
  const navbarCollapseRef = useRef(null);

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

  // Fonction pour fermer le menu hamburger
  const closeNavbar = () => {
    if (navbarCollapseRef.current && isMobile) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapseRef.current, {
        toggle: false
      });
      bsCollapse.hide();
    }
  };

  return (
    <nav className={`navbar navbar-expand-xxl ${darkMode ? "navbar-dark" : "navbar-light"} navbar-custom px-4 ${darkMode ? "dark-mode" : ""}`}>
      <Link className="navbar-brand" to="/" onClick={closeNavbar}>
        <img src="logo1.png" alt="logo" height="50" className="navbar-brand" />
        <span className="brand-text">Byte Brigade</span>
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

      <div className="collapse navbar-collapse" id="navbarNav" ref={navbarCollapseRef}>
        <ul className="navbar-nav ms-auto">
          {/* Liens du menu */}
          <li className="nav-item">
            <Link className="nav-link" to="/cours" onClick={closeNavbar}>Cours</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/activites" onClick={closeNavbar}>Activités</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/membres" onClick={closeNavbar}>Nos membres</Link>
          </li>

          {/* Contenu conditionnel utilisateur */}
          {currentUser ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/profile" onClick={closeNavbar}>
                  👤 {currentUser.prenom || currentUser.displayName || "Profil"}
                </Link>
              </li>
              {currentUser.role === "admin" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard" onClick={closeNavbar}>
                  📊 Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin" onClick={closeNavbar}>
                  ⚙️ Admin
                </Link>
              </li>
            </>
          )}
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={closeNavbar}>Se connecter</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register" onClick={closeNavbar}>S'inscrire</Link>
              </li>
            </>
          )}

          {/* Bouton de déconnexion (seulement si connecté) */}
          {currentUser && (
            <li className="nav-item">
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleLogout();
                  closeNavbar();
                }}
              >
                Déconnexion
              </button>
            </li>
          )}
          
          {/* Bouton de changement de thème (toujours visible) */}
          <li className="nav-item">
            <button 
              className="btn btn-secondary"
              onClick={() => {
                toggleTheme();
                closeNavbar();
              }}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}