import React, { useContext, useState } from "react";
import CardMembre from "./CardMembre";
import { AuthContext } from "../AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const membresData = {
  "2024-2025": [
    { photo: "ikram.jpg" },
    { photo: "fati.jpg" },
    { photo: "aya.jpg" },
    { photo: "fatima.jpg" },
    { photo: "anas.jpg" },
    { photo: "ikram bel.jpg" },
    { photo: "zineb.jpg" },
    { photo: "touria.jpg" },
  ],
  "2025-2026": [
    { photo: "ikram25.jpg" },
    { photo: "fatihabibi25.jpg" },
    { photo: "aya25.jpg" },
    { photo: "fatima25.jpg" },
    { photo: "anas25.jpg" },
    { photo: "ikrambel25.jpg" },
    { photo: "fatiel25.jpg" },
    { photo: "touria25.jpg" },
  ],
};

// Variants pour les cartes (stagger + fade/zoom)
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // délai entre l'apparition des cartes
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: -20 },
};

function Membres() {
  const { currentUser } = useContext(AuthContext);
  const [annee, setAnnee] = useState("2025-2026");

  return (
    <div className="container text-center py-5">
      {/* Titre animé */}
      <motion.h2
        key={annee} // déclenche l'animation à chaque changement d'année
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-4"
      >
        Membres du Bureau – {annee}
      </motion.h2>

      {/* Sélecteur d'année */}
      <div className="mb-4">
        <label htmlFor="annee-select" className="me-2 fw-bold">
          Sélectionnez une année :
        </label>
        <select
          id="annee-select"
          value={annee}
          onChange={(e) => setAnnee(e.target.value)}
        >
          {Object.keys(membresData).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Cartes animées */}
      <motion.div
        className="row justify-content-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={annee} // permet de réanimer le container quand l'année change
      >
        <AnimatePresence>
          {membresData[annee].map((m) => (
            <motion.div
              key={m.photo}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <CardMembre {...m} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Membres;
