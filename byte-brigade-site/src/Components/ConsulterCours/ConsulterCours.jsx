import React, { useState, useEffect } from 'react'
import { db } from '../Firebase/Firebase'
import { collection, getDocs } from 'firebase/firestore'
import './ConsulterCours.css'

function ConsulterCours() {
  const [cours, setCours] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCours = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cours'))
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setCours(data)
      } catch (error) {
        console.error("Erreur lors du chargement des cours :", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCours()
  }, [])

  return (
    <div className="container mt-5">
      <h2>📚 Cours disponibles</h2>

      {loading ? (
        <p>Chargement des cours...</p>
      ) : cours.length === 0 ? (
        <p>Aucun cours disponible pour le moment.</p>
      ) : (
        <div className="cours-container">
          {cours
            .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)
            .map(c => (
              <div className="cours-card" key={c.id}>
  <h4 className="cours-titre">📘 {c.titre}</h4>

  <a className="btn-cours" href={c.pdfUrl} target="_blank" rel="noopener noreferrer">
    📄 Télécharger le PDF
  </a>

  {Array.isArray(c.exercices) && c.exercices.length > 0 ? (
    <div className="exercices">
      <strong>📝 Exercices :</strong>
      <ul>
        {c.exercices.map((ex, index) => (
          <li key={index}>
            {typeof ex === 'string' ? (
              <a href={ex} target="_blank" rel="noopener noreferrer" style={{ color: '#00008B' }}>
                🌐 Exercice {index + 1}
              </a>
            ) : (
              <a href={ex.pdfUrl} target="_blank" rel="noopener noreferrer">
                📎 {ex.titre || `Exercice ${index + 1}`}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p className="no-exercices">Aucun exercice disponible.</p>
  )}

  <small className="cours-date">
    📅 Ajouté le : {c.createdAt
      ? new Date(c.createdAt.seconds * 1000).toLocaleDateString()
      : "Date inconnue"}
  </small>
</div>

            ))}
        </div>
      )}
    </div>
  )
}

export default ConsulterCours
