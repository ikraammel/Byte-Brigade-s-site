import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth, db } from "../Firebase/Firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import LoginGoogle from "./LoginGoogle";
import { AuthContext } from "../AuthContext";
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useContext(AuthContext);

  const goToInscription = () => {
    navigate("/register");
  };

  const updateOnlineStatus = async (user, userData) => {
    try {
      const userDocRef = doc(db, "connectedUsers", user.uid);
      const userDataToSave = {
        uid: user.uid,
        email: user.email,
        nom: userData.nom,
        prenom: userData.prenom,
        isOnline: true,
        lastSeen: serverTimestamp(),
      };
      await setDoc(userDocRef, userDataToSave);
      console.log("✅ Utilisateur connecté enregistré :", userDataToSave);
    } catch (err) {
      console.error("❌ Erreur Firestore :", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      setLoading(false)
      return;
    }

    try {
      // Vérifier si cet email est lié à Google
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.includes("google.com")) {
        setError("Cet email est utilisé avec Google. Connectez-vous via Google.");
        setLoading(false);
        return;
      }

      // Connexion normale
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const role = userData.role;

        const userInfo = {
          email,
          role,
          nom: userData.nom,
          prenom: userData.prenom,
          displayName: `${userData.prenom} ${userData.nom}`,
        };

        localStorage.setItem("user", JSON.stringify(userInfo));
        setCurrentUser(userInfo);

        await updateOnlineStatus(user, userData);

        if (role === "admin") {
          toast.success("Connexion réussie en tant qu'admin");
          navigate("/admin");
        } else {
          toast.success("Connexion réussie");
          navigate("/cours");
        }
      } else {
        setError("Aucun rôle défini pour cet utilisateur.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      switch (error.code) {
        case "auth/user-not-found":
          setError("Aucun utilisateur trouvé avec cet email.");
          break;
        case "auth/wrong-password":
          setError("Mot de passe incorrect.");
          break;
        case "auth/invalid-email":
          setError("Adresse email invalide.");
          break;
        case "auth/user-disabled":
          setError("Ce compte est désactivé.");
          break;
        case "auth/network-request-failed":
          setError("Erreur réseau. Veuillez vérifier votre connexion internet.");
          break;
        default:
          setError("Une erreur s'est produite. Veuillez réessayer.");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center min-vh-100">
      <form onSubmit={handleSubmit} className="login-form p-4 rounded shadow">
        <h2 className="mb-4 text-center text-white">Connexion</h2>

        <div className="mb-3">
          <label className="form-label text-white">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="position-relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {error && <div className="text-danger mt-2">{error}</div>}

        <button type="submit" className="btn btn-custom w-100" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <p className="mt-2">
          <Link to="/reset-password">Mot de passe oublié ?</Link>
        </p>

        <LoginGoogle navigate={navigate} />

        <div className="text-center mt-2">
          <span className="text-white">Pas encore de compte ? </span>
          <button
            type="button"
            className="btn btn-link text-info p-0"
            onClick={goToInscription}
          >
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
