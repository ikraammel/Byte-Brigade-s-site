import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { formatRelative } from "date-fns";
import { fr } from "date-fns/locale";
import './ConnectedUsers.css';

export default function ConnectedUsers() {
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    const q = collection(db, "connectedUsers");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      allUsers.sort((a, b) => {
        if (!a.lastSeen) return 1;
        if (!b.lastSeen) return -1;
        return b.lastSeen.toMillis() - a.lastSeen.toMillis();
      });

      setConnectedUsers(allUsers);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="connected-users-container">
      <h4 className="text-center mb-4">Utilisateurs en ligne</h4>

      {connectedUsers.length > 0 ? (
        <div className="table-scroll-container">
          <table className="connected-users-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Dernière activité</th>
              </tr>
            </thead>
            <tbody>
              {connectedUsers.map((user, index) => (
                <tr key={index}>
                  <td data-label="Nom">{user.nom || "—"}</td>
                  <td data-label="Prénom">{user.prenom || "—"}</td>
                  <td data-label="Email">{user.email || "—"}</td>
                  <td data-label="Dernière activité">
                    {user.lastSeen?.toDate
                      ? formatRelative(user.lastSeen.toDate(), new Date(), {
                          locale: fr,
                        })
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-muted">Aucun utilisateur en ligne</p>
      )}
    </div>
  );
}
