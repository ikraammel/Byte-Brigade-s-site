import React, { useState, useEffect } from 'react';
import { db } from '../Firebase/Firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import AjoutCours from './AjoutCours';

function Admin() {
  // Cours
  const [cours, setCours] = useState([]);
  const [loadingCours, setLoadingCours] = useState(true);
  // Demandes adhésion
  const [demandes, setDemandes] = useState([]);
  const [loadingDemandes, setLoadingDemandes] = useState(true);

  // Edition cours
  const [editId, setEditId] = useState(null);
  const [editTitre, setEditTitre] = useState('');

  // Récupérer cours
  useEffect(() => {
    async function fetchCours() {
      setLoadingCours(true);
      try {
        const querySnapshot = await getDocs(collection(db, "cours"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCours(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des cours :", error);
      }
      setLoadingCours(false);
    }
    fetchCours();
  }, []);

  // Récupérer demandes adhésion
  useEffect(() => {
    async function fetchDemandes() {
      setLoadingDemandes(true);
      try {
        const querySnapshot = await getDocs(collection(db, "demandesAdhesion"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDemandes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des demandes :", error);
      }
      setLoadingDemandes(false);
    }
    fetchDemandes();
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

  // Edition cours
  const startEdit = (id, titre) => {
    setEditId(id);
    setEditTitre(titre);
  };
  const cancelEdit = () => {
    setEditId(null);
    setEditTitre('');
  };
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

  // Ajoute cette fonction dans ton composant Admin
const handleDeleteDemande = async (id) => {
  if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) return;
  try {
    await deleteDoc(doc(db, "demandesAdhesion", id));
    setDemandes(demandes.filter(d => d.id !== id));
    alert("Demande supprimée avec succès !");
  } catch (error) {
    console.error("Erreur lors de la suppression de la demande :", error);
    alert("Erreur lors de la suppression.");
  }
};


  return (
    <div className="container mt-5">
      <h1>Bienvenue dans le panneau d'administration</h1>

      {/* Section Ajout cours */}
      <section>
        <h2>Ajouter un nouveau cours</h2>
        <AjoutCours />
      </section>

      {/* Section Gestion des cours */}
      <section>
        <h2>Gestion des cours</h2>
        {loadingCours ? (
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
                    <button onClick={() => startEdit(c.id, c.titre)} style={{ marginLeft: '8px' }}>Éditer</button>
                    <button onClick={() => handleDelete(c.id)} style={{ marginLeft: '5px' }}>Supprimer</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Nouvelle section : Gestion des demandes d'adhésion */}
      <section style={{ marginTop: '50px' }}>
        <h2>Demandes d'adhésion reçues</h2>
        {loadingDemandes ? (
          <p>Chargement des demandes...</p>
        ) : demandes.length === 0 ? (
          <p>Aucune demande pour le moment.</p>
        ) : (
          <div className="table-responsive mt-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Niveau</th>
                  <th>Sexe</th>
                  <th>Motivation</th>
                  <th>Passionné</th>
                  <th>Compétences</th>
                  <th>Commentaires</th>
                  <th>Soumis le</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {demandes.map(demande => (
                  <tr key={demande.id}>
                    <td>{demande.nom}</td>
                    <td>{demande.prenom}</td>
                    <td>{demande.email}</td>
                    <td>{demande.tel}</td>
                    <td>{demande.niveau}</td>
                    <td>{demande.sexe}</td>
                    <td>{demande.motivation}</td>
                    <td>{demande.passionne}</td>
                    <td>{demande.competences?.join(", ")}</td>
                    <td>{demande.commentaires}</td>
                    <td>{demande.timestamp?.toDate().toLocaleString()}</td>
                    <td>
                      <button 
                        onClick={() => handleDeleteDemande(demande.id)} 
                        className="btn btn-danger btn-sm"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

    </div>
  );
}

export default Admin;
