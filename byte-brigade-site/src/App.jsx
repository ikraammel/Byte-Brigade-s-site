  import React, { useEffect } from "react";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import "./App.css";
  import 'bootstrap/dist/css/bootstrap.min.css';

  import Home from "./Components/HomePage/Home";
  import Navbar from "./Components/Navbar/Navbar";
  import Login from "./Components/Login/Login";
  import Membres from "./Components/Membres/Membres";
  import Register from "./Components/Register/Register";
  import Admin from "./Components/Admin/Admin";
  import ConsulterCours from "./Components/ConsulterCours/ConsulterCours";
  import Profile from "./Components/Profile/Profile";
  import ProtectedRouteAdmin from "./Components/ProtectRoute/ProtectedRouteAdmin";
  import ProtectProfile from "./Components/ProtectRoute/ProtectProfile";
  import ResetPassword from "./Components/Login/ResetPassword";
  import { auth, db } from "./Components/Firebase/Firebase";
  import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
  import AdhesionForm from "./Components/Adhesion/AdhesionForm";
  import ConfirmResetPassword from "./Components/Login/ConfirmResetPassword";
  import Footer from "./Components/Footer/Footer";
import Activites from "./Components/Activites/Activites";

  function AdhesionPage() {
    return <AdhesionForm />
        
  }
  function App() {
    // Met à jour isOnline=false quand on ferme l'onglet ou recharge
    useEffect(() => {
      const handleBeforeUnload = async () => {
        const user = auth.currentUser;
        if (user) {
          await updateDoc(doc(db, "connectedUsers", user.uid), {
            isOnline: false,
            lastSeen: serverTimestamp(),
          });
        }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, []);

    return (
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <div className="app-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/membres" element={<Membres />} />
                <Route path="/activites" element={<Activites />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRouteAdmin>
                      <Admin />
                    </ProtectedRouteAdmin>
                  }
                />
                <Route
                  path="/cours"
                  element={
                    <ProtectProfile>
                      <ConsulterCours />
                    </ProtectProfile>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectProfile>
                      <Profile />
                    </ProtectProfile>
                  }
                />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/reset-confirm" element={<ConfirmResetPassword />} />
                <Route path="/adhesion" element={<AdhesionPage />} />
              </Routes>
          </div>
          <Footer/> 
        </div>
      </Router>
    );
  }

  export default App;
