import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../Firebase/Firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../AuthContext';

function LoginGoogle() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      // Si c’est la première connexion Google, on crée le document dans "users"
      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          role: 'user',
          prenom: user.displayName?.split(' ')[0] || '',
          nom: user.displayName?.split(' ')[1] || '',
        });
      }

      const userData = (await getDoc(userDocRef)).data();

      // 🔥 MISE À JOUR DE LA COLLECTION connectedUsers
      const connectedUserRef = doc(db, 'connectedUsers', user.uid);
      await setDoc(connectedUserRef, {
        uid: user.uid,
        email: user.email,
        nom: userData.nom,
        prenom: userData.prenom,
        isOnline: true,
        lastSeen: serverTimestamp()
      });

      const userInfo = {
        email: user.email,
        role: userData.role,
        nom: userData.nom,
        prenom: userData.prenom,
        displayName: user.displayName
      };

      localStorage.setItem('user', JSON.stringify(userInfo));
      setCurrentUser(userInfo);

      alert(`Bienvenue ${user.displayName}`);
      navigate(userData.role === 'admin' ? '/admin' : '/cours');

    } catch (error) {
      console.error('Erreur Google Auth :', error);
      alert('Erreur: ' + error.message);
    }
  };

  return (
    <button type="button" className="btn btn-outline-light w-100 mt-3" onClick={handleGoogleLogin}>
      <img src="google.png" alt="google" /> Se connecter avec Google 
    </button>
  );
}

export default LoginGoogle;
