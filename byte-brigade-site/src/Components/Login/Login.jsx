import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import LoginGoogle from './LoginGoogle';

function Login() {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')

  const goToInscription = () => {
    navigate('/register')
  }


  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      await signInWithEmailAndPassword(auth,email,password)
      alert('Connexion réussie !')
      navigate('/')
    }catch(error){
      console.error(error)
      setError('Email / mot de passe invalide')
    }
    
  }
  return (
    <div className="login-page d-flex justify-content-center align-items-center min-vh-100">
      <form onSubmit={handleSubmit} className="login-form p-4 rounded shadow">
        <h2 className="mb-4 text-center text-white">Connexion</h2>

        <div className="mb-3">
          <label className="form-label text-white">Email</label>
          <input type="email" className="form-control" placeholder="exemple@ens.ma" value={email} 
          onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Mot de passe</label>
          <input type="password" className="form-control" placeholder="••••••••" value={password} 
          onChange={e => setPassword(e.target.value)}/>
        </div>
        {error && <div className='text-danger mt-2'>{error}</div>}

        <button type="submit" className="btn btn-custom w-100">Se connecter</button>
         <LoginGoogle/>
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
