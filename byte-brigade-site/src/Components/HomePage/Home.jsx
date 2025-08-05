import React from 'react';
import './style.css';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';


function Home() {
  const { darkMode } = useContext(AuthContext);
  
 return (
    <div className={`home-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="logo-electric">
        <img 
          src="logo1.png" 
          alt="Byte Brigade Logo" 
          className="logo" 
        />
      </div>
      <div className="hero-section">
        <h1>
          Bienvenue au <span className="highlight">Club Byte Brigade</span>
        </h1>
        <p className="subtitle">
          Le club informatique de l'ENSAS, où passion et technologie se rencontrent.
        </p>
      </div>
      <div className="features-section">
        <div className="feature-card">
          <div className="icon">📚</div>
          <h3>Partage de connaissances</h3>
          <p>Cours, tutoriels et ressources pour tous les niveaux</p>
        </div>
        
        <div className="feature-card">
          <div className="icon">👥</div>
          <h3>Projets collaboratifs</h3>
          <p>Créez des solutions innovantes en équipe</p>
        </div>
        
        <div className="feature-card">
          <div className="icon">🏆</div>
          <h3>Événements tech</h3>
          <p>Hackathons, conférences et compétitions</p>
        </div>
      </div>

      <button 
        className="cta-button"
        onClick={() => window.location.href = "/adhesion"}
      >
        Rejoignez-nous
      </button>
    </div>
  );
}


export default Home;