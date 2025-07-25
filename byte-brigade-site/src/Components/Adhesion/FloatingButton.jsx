import React from "react";
import { useNavigate } from "react-router-dom";

export default function FloatingButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/adhesion")}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#6f42c1",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "clamp(50px, 12vw, 70px)",
        height: "clamp(50px, 12vw, 70px)",
        fontSize: "clamp(12px, 2.5vw, 16px)",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: "1.2"
      }}
      aria-label="Postuler"
      title="Postuler au club"
    >
      Postuler
    </button>
  );
}