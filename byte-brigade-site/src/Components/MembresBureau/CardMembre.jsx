import React from 'react';

function CardMembre({ photo }) {
  return (
    <div className="card shadow-sm text-center" style={{ width: "18rem", borderRadius: "15px" }}>
      <img
        src={`/${photo}`}
        alt="Membre du bureau"
        className="card-img-top"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "15px",
          objectFit: "cover"
        }}
      />
    </div>
  );
}

export default CardMembre;
