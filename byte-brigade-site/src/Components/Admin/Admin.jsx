import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import AjoutCours from './AjoutCours';

function Admin() {
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pour gérer l'édition
  const [editId, setEditId] = useState(null);
  const [editTitre, setEditTitre] = useState('');

  useEffect(() => {
    async function fetchCours() {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "cours"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCours(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des cours :", error);
      }
      setLoading(false);
    }
    fetchCours();
  }, []);

  // Supprimer un cours
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce cours ?")) return;
    try {
      await deleteDoc(doc(db, "cours", id));
      setCours(cours.filter(c => c.id !== id));
      alert("Cours supprimé avec succès !");
    } catch (error) {
      console.error("Erreur suppression : ", error);
      alert("Erreur lors de la suppression.");
    }
  };

  // Démarrer l'édition
  const startEdit = (id, titre) => {
    setEditId(id);
    setEditTitre(titre);
  };

  // Annuler l'édition
  const cancelEdit = () => {
    setEditId(null);
    setEditTitre('');
  };

  // Sauvegarder l'édition
  const handleEditSave = async () => {
    if (editTitre.trim() === '') {
      alert("Le titre ne peut pas être vide");
      return;
    }
    try {
      await updateDoc(doc(db, "cours", editId), { titre: editTitre });
      setCours(cours.map(c => c.id === editId ? { ...c, titre: editTitre } : c));
      setEditId(null);
      setEditTitre('');
      alert("Cours mis à jour !");
    } catch (error) {
      console.error("Erreur mise à jour :", error);
      alert("Erreur lors de la mise à jour.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Bienvenue dans le panneau d'administration</h1>
      <section>
        <h2>Ajouter un nouveau cours</h2>
        <AjoutCours/>
      </section>
      <section>
        <h2>Gestion des cours</h2>

        {loading ? (
          <p>Chargement des cours...</p>
        ) : (
          <ul>
            {cours.map(c => (
              <li key={c.id} style={{ marginBottom: '10px' }}>
                {editId === c.id ? (
                  <>
                    <input 
                      type="text" 
                      value={editTitre} 
                      onChange={e => setEditTitre(e.target.value)} 
                      style={{ marginRight: '8px' }}
                    />
                    <button onClick={handleEditSave}>Sauvegarder</button>
                    <button onClick={cancelEdit} style={{ marginLeft: '5px' }}>Annuler</button>
                  </>
                ) : (
                  <>
                    {c.titre} - 
                    <button onClick={() => startEdit(c.id, c.titre)} style={{ marginLeft: '8px' }}>Editer</button>
                    <button onClick={() => handleDelete(c.id)} style={{ marginLeft: '5px' }}>Supprimer</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Admin;
