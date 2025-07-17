import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

function Register() {
    const navigate = useNavigate()

    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [prenom,setPrenom] = useState('')

    //Validation simple du mdp
    const validatePassword = (pwd) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;<>,.?~-]).{8,}$/
        return regex.test(pwd) 
    }
    const goToLogin = () => {
        navigate('/login')
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!validatePassword(password)){
            setError('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.')
            return 
        }
        
        try{
            await createUserWithEmailAndPassword(auth,email,password);
            alert('Inscription réussie !')
            navigate('/login')
        }catch(error){
        console.error(error)
        setError(error.message)
        }
    }

    

  return (
    <div>
      <div className="login-page d-flex justify-content-center align-items-center min-vh-100">
      <form onSubmit={handleSubmit} className="login-form p-4 rounded shadow">
        <h2 className="mb-4 text-center text-white">Inscription</h2>

        <div className="mb-3">
          <label className="form-label text-white">Nom</label>
          <input type="text" className="form-control" placeholder="" value={name} onChange={e => setName(e.target.value)}/>
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Prenom</label>
          <input type="text" className="form-control" placeholder="" value={prenom} onChange={e => setPrenom(e.target.value)}/>
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Email</label>
          <input type="email" className="form-control" placeholder="exemple@ens.ma" value={email} 
          onChange={e => setEmail(e.target.value)}/>
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Mot de passe</label>
          <input type="password" className="form-control" placeholder="••••••••" value={password} 
          onChange={e => setPassword(e.target.value)}/>
          {error && <div className='text-danger mt-1'>{error}</div>}
        </div>

        <button type="submit" className="btn btn-custom w-100">S'inscrire</button>

        <div className="text-center">
          <span className="text-white">Vous avez déjà un compte ? </span>
          <button
            type="button"
            className="btn btn-link text-info p-0"
            onClick={goToLogin}
          >
            Se connecter
          </button>
        </div>
        
      </form>
    </div>
    </div>
  )
}

export default Register
