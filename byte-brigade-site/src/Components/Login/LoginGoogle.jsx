import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../Firebase/Firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../AuthContext';
import { toast } from 'react-toastify';

function LoginGoogle() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const provider = new GoogleAuthProvider();

  // Fonction pour gérer l'utilisateur après connexion
  const handleUserAfterLogin = async (user) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // Première connexion → créer le doc
      const fullName = user.displayName || '';
      const nameParts = fullName.split(' ');
      const prenom = nameParts[0] || '';
      const nom = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        prenom,
        nom,
        role: 'user',
        isApproved: false,
        createdAt: serverTimestamp(),
      });

      toast.info('Votre compte sera approuvé par un administrateur.');
      setLoading(false);
      return;
    }

    const userData = userSnap.data();

    if (!userData.isApproved) {
      setError('Votre compte est en attente d’approbation par un administrateur.');
      toast.error('Votre compte est en attente de validation.');
      setLoading(false);
      return;
    }

    // Stocker l’utilisateur dans contexte + localStorage
    const userInfo = {
      email: user.email,
      role: userData.role || 'user',
      nom: userData.nom || '',
      prenom: userData.prenom || '',
      displayName: user.displayName || `${userData.prenom} ${userData.nom}`,
    };

    localStorage.setItem('user', JSON.stringify(userInfo));
    setCurrentUser(userInfo);

    toast.success(`Bienvenue ${userInfo.displayName}`);
    navigate(userData.role === 'admin' ? '/admin' : '/cours');
  };

  // Fonction de connexion Google
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const isMobile = /Mobi|Android/i.test(navigator.userAgent);

      if (isMobile) {
        // Mobile → redirection
        await signInWithRedirect(auth, provider);
      } else {
        // Desktop → popup
        const result = await signInWithPopup(auth, provider);
        await handleUserAfterLogin(result.user);
      }
    } catch (err) {
      console.error('Erreur Google Auth :', err);
      setError('Erreur : ' + err.message);
      toast.error('Erreur : ' + err.message);
      setLoading(false);
    }
  };

  // Vérifier le résultat après redirection (mobile)
  useEffect(() => {
    const fetchRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          await handleUserAfterLogin(result.user);
        }
      } catch (err) {
        console.error('Erreur Redirect Google :', err);
      }
    };
    fetchRedirectResult();
  }, [navigate, setCurrentUser]);

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await handleUserAfterLogin(user);
      }
    });
    return () => unsubscribe();
  }, [navigate, setCurrentUser]);

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
