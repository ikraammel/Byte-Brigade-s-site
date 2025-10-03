import React, { useState, useEffect } from 'react';
import { db } from '../Firebase/Firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc ,query,orderBy} from 'firebase/firestore';
import AjoutCours from './AjoutCours';
import { toast } from 'react-toastify';
import './style.css';

function Admin() {
  // Cours
  const [cours, setCours] = useState([]);
  const [loadingCours, setLoadingCours] = useState(true);

  // Demandes adhésion
  const [demandes, setDemandes] = useState([]);
  const [loadingDemandes, setLoadingDemandes] = useState(true);

  // Utilisateurs
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [filter, setFilter] = useState("all"); // "all" | "approved" | "pending"

  // Edition cours
  const [editId, setEditId] = useState(null);
  const [editTitre, setEditTitre] = useState('');

  // 📌 Récupérer cours
  useEffect(() => {
    async function fetchCours() {
      setLoadingCours(true);
      try {
        const querySnapshot = await getDocs(collection(db, "cours"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCours(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des cours :", error);
        toast.error("Erreur lors de la récupération des cours");
      }
      setLoadingCours(false);
    }
    fetchCours();
  }, []);

  // 📌 Récupérer demandes adhésion
  useEffect(() => {
  async function fetchDemandes() {
    setLoadingDemandes(true);
    try {
      const q = query(collection(db, "demandesAdhesion"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDemandes(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des demandes :", error);
      toast.error("Erreur lors de la récupération des demandes");
    }
    setLoadingDemandes(false);
  }
  fetchDemandes();
}, []);

  // 📌 Récupérer utilisateurs
  useEffect(() => {
    async function fetchUsers() {
      setLoadingUsers(true);
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(data);
      } catch (error) {
        console.error("Erreur récupération utilisateurs :", error);
        toast.error("Erreur lors de la récupération des utilisateurs");
      }
      setLoadingUsers(false);
    }
    fetchUsers();
  }, []);

  // 📌 Supprimer cours
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce cours ?")) {
      try {
        await deleteDoc(doc(db, "cours", id));
        setCours(cours.filter(c => c.id !== id));
        toast.success("Cours supprimé avec succès !");
      } catch (error) {
        console.error("Erreur suppression : ", error);
        toast.error("Erreur lors de la suppression.");
      }
    }
  };

  // 📌 Edition cours
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
      toast.error("Le titre ne peut pas être vide");
      return;
    }
    try {
      await updateDoc(doc(db, "cours", editId), { titre: editTitre });
      setCours(cours.map(c => c.id === editId ? { ...c, titre: editTitre } : c));
      setEditId(null);
      setEditTitre('');
      toast.success("Cours mis à jour !");
    } catch (error) {
      console.error("Erreur mise à jour :", error);
      toast.error("Erreur lors de la mise à jour.");
    }
  };

  // 📌 Supprimer demande adhésion
  const handleDeleteDemande = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) {
      try {
        await deleteDoc(doc(db, "demandesAdhesion", id));
        setDemandes(demandes.filter(d => d.id !== id));
        toast.success("Demande supprimée avec succès !");
      } catch (error) {
        console.error("Erreur lors de la suppression de la demande :", error);
        toast.error("Erreur lors de la suppression.");
      }
    }
  };

  // 📌 Approuver ou bloquer un utilisateur
  const handleApproval = async (userId, newStatus) => {
    try {
      await updateDoc(doc(db, "users", userId), { isApproved: newStatus });
      setUsers(users.map(u => u.id === userId ? { ...u, isApproved: newStatus } : u));
      toast.success(`Utilisateur ${newStatus ? "approuvé" : "bloqué"} avec succès !`);
    } catch (error) {
      console.error("Erreur mise à jour approbation :", error);
      toast.error("Erreur lors de la mise à jour.");
    }
  };

  // 📌 Filtrer les utilisateurs
  const filteredUsers = users.filter(user => {
    if (filter === "approved") return user.isApproved;
    if (filter === "pending") return !user.isApproved;
    return true;
  });

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

      {/* Section Demandes d'adhésion */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <div className="demandes-container">
          <h2>Demandes d'adhésion reçues</h2>
          {loadingDemandes ? (
            <p>Chargement des demandes...</p>
          ) : demandes.length === 0 ? (
            <p>Aucune demande pour le moment.</p>
          ) : (
            <div className="table-responsive mt-4">
              <table className="demandes-table">
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
        </div>
      </div>

      {/* Section Gestion des utilisateurs */}
      <div className="users-container mt-5">
        <h2>Gestion des utilisateurs</h2>
        <div className="mb-3">
          <label>Filtrer : </label>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="ms-2">
            <option value="all">Tous</option>
            <option value="approved">Approuvés</option>
            <option value="pending">En attente</option>
          </select>
        </div>
        {loadingUsers ? (
          <p>Chargement des utilisateurs...</p>
        ) : filteredUsers.length === 0 ? (
          <p>Aucun utilisateur trouvé.</p>
        ) : (
          <div className="table-responsive mt-4">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.nom}</td>
                    <td>{user.prenom}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.isApproved ? "✅ Approuvé" : "⛔ En attente"}</td>
                    <td>
                      {!user.isApproved ? (
                        <button
                          onClick={() => handleApproval(user.id, true)}
                          className="btn btn-success btn-sm"
                        >
                          Approuver
                        </button>
                      ) : (
                        <button
                          onClick={() => handleApproval(user.id, false)}
                          className="btn btn-warning btn-sm"
                        >
                          Bloquer
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
