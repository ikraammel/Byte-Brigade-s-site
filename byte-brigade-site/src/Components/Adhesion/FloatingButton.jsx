import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

export default function FloatingButton() {
  const navigate = useNavigate();
  const { darkMode } = useContext(AuthContext);

  return (
    <button
      onClick={() => navigate("/adhesion")}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: darkMode ? "#4a1b9a" : "#6f42c1", // Changement ici
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        fontSize: "14px",
        cursor: "pointer",
        boxShadow: darkMode ? "0 4px 12px rgba(0,0,0,0.6)" : "0 4px 8px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: "1.2",
        transition: "all 0.3s ease",
        zIndex: 1000
      }}
      aria-label="Postuler"
      title="Postuler au club"
    >
      Postuler
    </button>
  );
}