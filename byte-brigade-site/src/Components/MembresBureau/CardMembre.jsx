import React from 'react'

function CardMember({nom,prenom,poste,filiere,photo}) {
  return (
    <div>
      <div className="card shadow-sm text-center" style={{ width: "18rem", borderRadius: "15px" }}>
        <img 
        src={`/${photo}`} 
        alt={`${prenom} ${nom}`} 
        className='className="card-img-top rounded-circle mx-auto mt-3"'
        style={{ width: "100px", height: "100px", objectFit: "cover", border: "3px solid #6A1B9A" }}
        />
         <div className="card-body">
            <h5 className="card-title text-primary">{prenom} {nom}</h5>
            <p className="card-text text-muted">{filiere}</p>
            <span className="badge bg-info text-dark">{poste}</span>
         </div>
      </div>
    </div>
  )
}

export default CardMember
