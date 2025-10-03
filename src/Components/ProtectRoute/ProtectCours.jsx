// PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function PrivateRoute({ children }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // Si l'utilisateur n'est pas connecté, rediriger vers /login
    return <Navigate to="/login" />;
  }

  // Sinon, afficher la page demandée
  return children;
}
