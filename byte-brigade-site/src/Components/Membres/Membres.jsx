import React, { useContext, useState } from 'react'
import CardMembre from './CardMembre'
import ConnectedUsers from './ConnectedUsers';
import { AuthContext } from '../AuthContext';

const membresData = {
  "2024-2025": [
    {
      photo:"ikram.jpg"
    },
    {
      photo:"fati.jpg"
    },
    {
      photo:"aya.jpg"
    },
    {
      photo:"fatima.jpg"
    },
    {
      photo:"anas.jpg"
    },
    {
      photo:"ikram bel.jpg"
    },
    {
      photo:"zineb.jpg"
    },
    {
      photo:"touria.jpg"
    }
  ]
}
function Membres(){
  const [annee,setannee] = useState("2024-2025")
  const {currentUser} = useContext(AuthContext)

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

      {currentUser && <ConnectedUsers/>}
    </div>
  );
}
export default Membres
