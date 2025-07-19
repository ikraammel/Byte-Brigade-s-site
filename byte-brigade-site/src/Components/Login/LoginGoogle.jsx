import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function LoginGoogle() {
  const navigate = useNavigate();

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
          role: 'user', // ou 'admin' si c'est un admin, à changer manuellement dans Firestore
          prenom: user.displayName?.split(' ')[0] || '',
          nom: user.displayName?.split(' ')[1] || '',
        });
      }

      const userData = (await getDoc(userDocRef)).data();
      localStorage.setItem('userRole', userData.role);
      localStorage.setItem('userEmail', user.email);

      alert(`Bienvenue ${user.displayName}`);
      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/cours');
      }
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
