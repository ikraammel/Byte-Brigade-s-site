import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../Firebase/Firebase';
import { doc, getDocs, collection, query, where, setDoc, serverTimestamp } from 'firebase/firestore';
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

      // Chercher le doc users par email
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      let userData;
      let userDocId;

      if (!querySnapshot.empty) {
        // Document existant
        const docSnap = querySnapshot.docs[0];
        userData = docSnap.data();
        userDocId = docSnap.id;
        console.log("🔥 userData:", userData);
      } else {
        // Première connexion : créer document
        const fullName = user.displayName || '';
        const nameParts = fullName.split(' ');
        const prenom = nameParts[0] || '';
        const nom = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

        const newUserRef = doc(usersRef); // nouveau doc auto-ID
        await setDoc(newUserRef, {
          email: user.email,
          role: 'user',
          prenom,
          nom,
          isApproved: false,
          createdAt: serverTimestamp()
        });

        toast.info("Votre compte sera approuvé par un administrateur.");
        setLoading(false);
        return;
      }

      // Vérifier isApproved
      if (!userData.isApproved) {
        setError("Votre compte est en attente d’approbation par un administrateur.");
        toast.error("Votre compte est en attente de validation.");
        setLoading(false);
        return;
      }

      // Mettre à jour statut en ligne
      const connectedUserRef = doc(db, 'connectedUsers', user.uid);
      await setDoc(connectedUserRef, {
        uid: user.uid,
        email: user.email || '',
        nom: userData.nom || '',
        prenom: userData.prenom || '',
        isOnline: true,
        lastSeen: serverTimestamp(),
      });

      // Préparer userInfo pour contexte et localStorage
      const userInfo = {
        email: user.email,
        role: userData.role || 'user',
        nom: userData.nom || '',
        prenom: userData.prenom || '',
        displayName: user.displayName || `${userData.prenom} ${userData.nom}`,
      };

      localStorage.setItem('user', JSON.stringify(userInfo));
      setCurrentUser(userInfo);

      toast.success(`Bienvenue ${user.displayName || userInfo.displayName}`);
      navigate(userData.role === 'admin' ? '/admin' : '/cours');

    } catch (err) {
      console.error('Erreur Google Auth :', err);

      switch (err.code) {
        case 'auth/popup-closed-by-user':
          setError('Connexion annulée. La fenêtre a été fermée.');
          toast.error('Connexion annulée.');
          break;
        case 'auth/network-request-failed':
          setError('Problème de connexion. Vérifiez votre connexion Internet.');
          toast.error('Problème réseau.');
          break;
        case 'auth/popup-blocked':
          setError('La fenêtre contextuelle a été bloquée. Autorisez les pop-ups.');
          toast.error('Pop-up bloquée.');
          break;
        default:
          setError('Une erreur est survenue : ' + err.message);
          toast.error('Erreur : ' + err.message);
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
