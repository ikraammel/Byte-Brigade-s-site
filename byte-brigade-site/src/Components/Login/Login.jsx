  import React, { useState, useContext } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth, db } from "../Firebase/Firebase";
  import { doc, getDoc,setDoc,serverTimestamp } from "firebase/firestore";
  import LoginGoogle from "./LoginGoogle";
  import { AuthContext } from "../AuthContext";


  function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword,setShowPassword] = useState(false)

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
        lastSeen: serverTimestamp()
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

      if (!email || !password) {
        setError("Veuillez remplir tous les champs");
        return;
      }

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const role = userData.role;

          const userInfo = {
            email: email,
            role: role,
            nom: userData.nom,
            prenom: userData.prenom,
            displayName: `${userData.prenom} ${userData.nom}`,
          };

          localStorage.setItem("user", JSON.stringify(userInfo));
          setCurrentUser(userInfo);

          // Met à jour le statut online dans Firestore
          await updateOnlineStatus(user,userData);

          if (role === "admin") {
            alert("Connexion réussie en tant qu'admin");
            navigate("/admin");
          } else {
            alert("Connexion réussie");
            navigate("/cours");
          }
        } else {
          setError("Aucun rôle défini pour cet utilisateur.");
        }
      } catch (error) {
        console.error(error);
        setError("Email ou mot de passe incorrect.");
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
              placeholder="exemple@ens.ma"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="••••••••"
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
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? "🙈" : "👁️"}
            </button>

          </div>
          
          {error && <div className="text-danger mt-2">{error}</div>}

          <button type="submit" className="btn btn-custom w-100">
            Se connecter
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
