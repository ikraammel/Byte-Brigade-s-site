import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
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
            <a className="nav-link" href="/cours">Cours</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/activites">Activités</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/membres">Nos membres du bureau</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">Se connecter</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/register">S'inscrire</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
