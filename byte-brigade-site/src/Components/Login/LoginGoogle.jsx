import React from 'react'
import { useNavigate } from 'react-router-dom'
import {signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
import { auth } from '../firebase'

function LoginGoogle() {
    const navigate = useNavigate()

    const handleGoogleLogin = async() => {
        const provider = new GoogleAuthProvider()
        try{
            const result = await signInWithPopup(auth,provider)
            const user = result.user
            console.log('Utilisateur connecté avec Google:',user)
            alert(`Bienvenue ${user.displayName}`)
            navigate('/')
        }catch(error){
            console.error('Erreur lors de la connexion Google',error)
            alert('Erreur: '+ error.message)
        }
    }
  return (
    <button className='btn btn-outline-light w-100 mt-3' onClick={handleGoogleLogin}>
      Se connecter avec Google
    </button>
  )
}

export default LoginGoogle
