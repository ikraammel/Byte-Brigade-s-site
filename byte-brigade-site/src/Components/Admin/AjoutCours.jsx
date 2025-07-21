import React, { useState } from 'react'
import { db } from '../Firebase/Firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

function AjoutCours() {
  const [titre, setTitre] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await addDoc(collection(db, 'cours'), {
        titre,
        pdfUrl: url,
        createdAt: serverTimestamp()
      })
      alert('Cours ajouté avec succès !')
      setTitre('')
      setUrl('')
    } catch (error) {
      console.error("Erreur ajout cours : ", error)
      alert('Erreur lors de l’ajout du cours.')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name='titre'
          value={titre}
          onChange={e => setTitre(e.target.value)}
          placeholder="Titre du cours"
          required
        />
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder='Lien Google Drive'
        />
        <button type='submit'>Ajouter le cours</button>
      </form>
    </div>
  )
}

export default AjoutCours
