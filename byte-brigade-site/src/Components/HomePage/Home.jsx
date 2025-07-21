import React from 'react';
import './style.css';

function Home() {
  return (
    <div className="homepage container text-center py-5">
      <img src="logo.PNG" alt="logo" className="logo mb-4" />

      <h1 className="display-4 fw-bold mb-3">Bienvenue au <span className="text-primary">Club Byte Brigade</span></h1>
      <p className="lead mb-5">Club informatique de l'ENSAS, passionné de code, d'IA et de technologies !</p>

      <section className="mb-5">
        <h2 className="h4 mb-3">Nos objectifs</h2>
        <ul className="list-unstyled">
          <li className="mb-2">✅ Partage de cours</li>
          <li className="mb-2">👨‍💻 Création de projets en équipe</li>
          <li>🚀 Participation aux événements & hackathons</li>
        </ul>
      </section>

      <button
        className="btn btn-primary btn-lg px-4"
        onClick={() => window.location.href = "/login"}
      >
        Se connecter
      </button>
    </div>
  );
}

export default Home;
