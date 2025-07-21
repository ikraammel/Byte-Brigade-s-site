import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import { formatRelative } from 'date-fns';
import { fr } from 'date-fns/locale';

function ConnectedUsers() {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const fetchConnectedUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'connectedUsers'));
        const users = snapshot.docs
          .map(doc => doc.data())
          .filter(user => user.isOnline);

        console.log("Utilisateurs en ligne :", users);
        setOnlineUsers(users);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs connectés:', error);
      }
    };

    fetchConnectedUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Membres du club connectés</h2>
      {onlineUsers.length === 0 ? (
        <p>Aucun utilisateur en ligne</p>
      ) : (
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Dernière activité</th>
            </tr>
          </thead>
          <tbody>
            {onlineUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.nom || '—'}</td>
                <td>{user.prenom || '—'}</td>
                <td>{user.email || '—'}</td>
                <td>
                  {user.lastSeen?.toDate
                    ? formatRelative(user.lastSeen.toDate(), new Date(), { locale: fr })
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ConnectedUsers;
