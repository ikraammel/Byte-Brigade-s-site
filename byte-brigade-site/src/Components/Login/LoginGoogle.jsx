import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { AuthContext } from '../AuthContext';

function LoginGoogle() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext); // récupère le setter du contexte

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Ajoute un rôle par défaut si premier login avec Google
        await setDoc(userDocRef, {
          email: user.email,
          role: 'user', // À ajuster dans Firestore si besoin
          prenom: user.displayName?.split(' ')[0] || '',
          nom: user.displayName?.split(' ')[1] || '',
        });
      }

      const userData = (await getDoc(userDocRef)).data();

      const userInfo = {
        email: user.email,
        role: userData.role,
        nom: userData.nom,
        prenom: userData.prenom,
        displayName: user.displayName
      };

      localStorage.setItem('user', JSON.stringify(userInfo));
      setCurrentUser(userInfo); // met à jour le contexte

      alert(`Bienvenue ${user.displayName}`);
      navigate(userData.role === 'admin' ? '/admin' : '/cours');

    } catch (error) {
      console.error('Erreur Google Auth :', error);
      alert('Erreur: ' + error.message);
    }
  };

  return (
    <button type="button" className="btn btn-outline-light w-100 mt-3" onClick={handleGoogleLogin}>
      Se connecter avec Google
    </button>
  );
}

export default LoginGoogle;
