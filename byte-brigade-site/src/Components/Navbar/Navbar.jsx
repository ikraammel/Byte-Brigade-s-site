import React from "react";


export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom px-4">
      <a className="navbar-brand" href="/">
        <img src="logo.PNG" alt="logo" height="40" className="me-2" />
        Byte Brigade
      </a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="/cours">Cours</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/activites">Activités</a>
          </li>
          <li className="nav-item">
            <a className="btn btn-custom" href="/membres">Nos membres du bureau</a>
          </li>
          <li className="nav-item">
            <a className="btn btn-custom text-dark hover-text-white" href="/login">Se connecter</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
