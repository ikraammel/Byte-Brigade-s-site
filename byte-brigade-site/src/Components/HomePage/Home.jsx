import React from 'react'
import './style.css'

function Home() {
  return (
    <div className='homepage'>
        <img src="logo.PNG" alt="logo" style={{ width: '100px', marginBottom: '20px' }} />
      <h1>Bienvenue au Club Byte Brigade</h1>
      <p>Club informatique de l'ENSAS , passionné de code, IA et tech !</p>
      <section>
        <h2>Nos objectifs</h2>
        <ul>
            <li>Partage de cours</li>
            <li>Création de projets en équipe</li>
            <li>Participation aux événements/hackathons</li>
        </ul>
      </section>

      <button onClick={() => window.location.href ="/login"}>Se connecter</button>
    </div>
  )
}

export default Home
