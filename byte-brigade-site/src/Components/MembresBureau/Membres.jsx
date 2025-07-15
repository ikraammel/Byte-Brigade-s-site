import React, { useState } from 'react'
import CardMembre from './CardMembre'

const membresData = {
  "2024-2025": [
    {
      nom:' El houl',
      prenom:'Ikram',
      filiere: 'GIIA',
      poste:"Présidente",
      photo:"ikram.jpg"
    }
  ]
}
function Membres(){
  const [annee,setannee] = useState("2024-2025")

  return(
    <div className="container text-center py-5">
      <h2 className="mb-4">Membres du Bureau – {annee}</h2>
       <select
        value={annee}
        onChange={e => setAnnee(e.target.value)}
        className="form-select w-auto mx-auto mb-4"
      >
        {Object.keys(membresData).map((a, idx) => (
          <option key={idx} value={a}>{a}</option>
        ))}
      </select>

      <div className="row justify-content-center gap-4">
        {membresData[annee].map((m, i) => (
          <div key={i} className="col-md-3">
            <CardMembre {...m} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Membres
