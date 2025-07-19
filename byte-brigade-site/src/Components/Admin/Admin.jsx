import React from 'react';

function Admin() {
  return (
    <div className="container mt-5">
      <h1>Bienvenue dans le panneau d'administration</h1>
      <p>Ici, vous pouvez gérer les cours, les utilisateurs, et plus encore.</p>

      {/* Exemple : Liste des cours (statique ou à récupérer depuis Firestore) */}
      <section>
        <h2>Gestion des cours</h2>
        <button className="btn btn-primary mb-3">Ajouter un nouveau cours</button>

        {/* Ici tu peux afficher la liste des cours avec possibilité d’éditer/supprimer */}
        <ul>
          <li>Cours 1 - <button>Editer</button> <button>Supprimer</button></li>
          <li>Cours 2 - <button>Editer</button> <button>Supprimer</button></li>
          {/* ... */}
        </ul>
      </section>

      {/* Autres sections comme gestion des membres, statistiques, etc. */}
    </div>
  );
}

export default Admin;
