import React, { useState, useEffect } from 'react'
import { db } from '../Firebase/Firebase'
import { collection, getDocs } from 'firebase/firestore'

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
        setLoading(false)
      } catch (error) {
        console.error("Erreur lors du chargement des cours :", error)
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
        <ul>
          {cours
            .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)
            .map(c => (
              <li key={c.id} style={{ marginBottom: '20px' }}>
                <strong>{c.titre}</strong><br />
                {c.pdfUrl && (
                  <a
                    href={c.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'white' }}
                  >
                    ➤ Voir / Télécharger le cours
                  </a>
                )}<br />
                <small>
                  Ajouté le :{" "}
                  {c.createdAt
                    ? new Date(c.createdAt.seconds * 1000).toLocaleDateString()
                    : "Date inconnue"}
                </small>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

export default ConsulterCours
