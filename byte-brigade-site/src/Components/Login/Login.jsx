import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()

  const goToInscription = () => {
    navigate('/register')
  }


  const handleSubmit = (e) =>{
    e.preventDefault()
    alert('Connexion réussie !')
    navigate('/')
  }
  return (
    <div className="login-page d-flex justify-content-center align-items-center min-vh-100">
      <form onSubmit={handleSubmit} className="login-form p-4 rounded shadow">
        <h2 className="mb-4 text-center text-white">Connexion</h2>

        <div className="mb-3">
          <label className="form-label text-white">Email</label>
          <input type="email" className="form-control" placeholder="exemple@ens.ma" />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Mot de passe</label>
          <input type="password" className="form-control" placeholder="••••••••" />
        </div>

        <button type="submit" className="btn btn-custom w-100">Se connecter</button>
        <div className="text-center">
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
