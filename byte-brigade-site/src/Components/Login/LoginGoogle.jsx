import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../Firebase/Firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../AuthContext';
import { toast } from 'react-toastify';

function LoginGoogle() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      let userDocSnap = await getDoc(userDocRef);

      const fullName = user.displayName || "";
      const nameParts = fullName.split(" ");
      const prenom = nameParts[0] || "";
      const nom = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      // Si première connexion, créer document utilisateur
      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          role: 'user',
          prenom,
          nom,
        });
        userDocSnap = await getDoc(userDocRef); // recharger doc
      }

      const userData = userDocSnap.data();

      // Met à jour l'état "en ligne"
      const connectedUserRef = doc(db, 'connectedUsers', user.uid);
      await setDoc(connectedUserRef, {
        uid: user.uid,
        email: user.email || "",
        nom: userData?.nom || "",
        prenom: userData?.prenom || "",
        isOnline: true,
        lastSeen: serverTimestamp(),
      });

      const userInfo = {
        email: user.email,
        role: userData.role || "user", // valeur par défaut
        nom: userData.nom || "",
        prenom: userData.prenom || "",
        displayName: user.displayName,
      };


      localStorage.setItem('user', JSON.stringify(userInfo));
      setCurrentUser(userInfo);

      toast.success(`Bienvenue ${user.displayName}`);
      navigate(userData.role === 'admin' ? '/admin' : '/cours');
    } catch (error) {
      console.error('Erreur Google Auth :', error);

      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('Connexion annulée. La fenêtre a été fermée.');
          toast.error('Connexion annulée. La fenêtre a été fermée.');
          break;
        case 'auth/network-request-failed':
          setError('Problème de connexion. Vérifie ta connexion Internet.');
          toast.error('Problème de connexion. Vérifie ta connexion Internet.');
          break;
        case 'auth/popup-blocked':
          setError('La fenêtre contextuelle a été bloquée. Veuillez autoriser les pop-ups.');
          toast.error('La fenêtre contextuelle a été bloquée. Veuillez autoriser les pop-ups.');
          break;
        default:
          setError('Une erreur est survenue : ' + error.message);
          toast.error('Une erreur est survenue : ' + error.message);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <div className="text-danger mb-2">{error}</div>}
      <button
        type="button"
        className="btn btn-outline-light w-100 mt-3"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        {loading ? 'Connexion en cours...' : (
          <>
            <img src="google.png" alt="google" style={{ width: 20, marginRight: 8 }} />
            Se connecter avec Google
          </>
        )}
      </button>
    </>
  );
}

export default LoginGoogle;
