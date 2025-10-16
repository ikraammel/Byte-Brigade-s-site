import React, { useContext, useState } from 'react'
import CardMembre from './CardMembre'
import ConnectedUsers from '../Dashboard/ConnectedUsers';
import { AuthContext } from '../AuthContext';

const membresData = {
  "2024-2025": [
    { photo: "ikram.jpg" },
    { photo: "fati.jpg" },
    { photo: "aya.jpg" },
    { photo: "fatima.jpg" },
    { photo: "anas.jpg" },
    { photo: "ikram bel.jpg" },
    { photo: "zineb.jpg" },
    { photo: "touria.jpg" }
  ],
  "2025-2026": [
    { photo: "ikram25.jpg" },
    { photo: "fatihabibi25.jpg" },
    { photo: "aya25.jpg" },
    { photo: "fatima25.jpg" },
    { photo: "anas25.jpg" },
    { photo: "ikrambel25.jpg" },
    { photo: "fatiel25.jpg" },
    { photo: "touria25.jpg" }
  ]
}

function Membres() {
  const { currentUser } = useContext(AuthContext);
  const [annee, setAnnee] = useState("2024-2025");

  return (
    <div className="container text-center py-5">
      <h2 className="mb-4">Membres du Bureau – {annee}</h2>

      {/* Sélecteur d'année */}
      <div className="mb-4">
        <label htmlFor="annee-select" className="me-2 fw-bold">Sélectionnez une année :</label>
        <select
          id="annee-select"
          value={annee}
          onChange={(e) => setAnnee(e.target.value)}
        >
          {Object.keys(membresData).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Affichage des membres */}
      <div className="row justify-content-center">
        {membresData[annee].map((m, i) => (
          <div
            key={i}
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4"
          >
            <CardMembre {...m} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Membres;
