import React from "react";
import { useNavigate } from "react-router-dom";

export default function FloatingButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/adhesion")}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        backgroundColor: "#6f42c1", // violet Bootstrap
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        fontSize: "16px",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
      }}
      aria-label="Postuler"
      title="Postuler au club"
    >
      Postuler
    </button>
  );
}
