import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { formatRelative } from "date-fns";
import { fr } from "date-fns/locale";

export default function ConnectedUsers() {
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
  const q = collection(db, "connectedUsers");
  const unsubscribe = onSnapshot(q, (snapshot) => {
    // Récupérer tous les utilisateurs
    const allUsers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Trier par lastSeen décroissant (les plus récents d'abord)
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
    <div className="mt-5">
      <h4 className="text-center mb-4">Utilisateurs en ligne</h4>

      {connectedUsers.length > 0 ? (
        <table className="table table-bordered table-hover">
          <thead className="text-white" style={{ backgroundColor: "#5a3e85" }}>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Dernière activité</th>
            </tr>
          </thead>
          <tbody>
            {connectedUsers.map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-light" : ""}>
                <td>{user.nom || "—"}</td>
                <td>{user.prenom || "—"}</td>
                <td>{user.email || "—"}</td>
                <td>
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
      ) : (
        <p className="text-center text-muted">Aucun utilisateur en ligne</p>
      )}
    </div>
  );
}
