import { sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom'

function ResetPassword() {
  const [email,setEmail] = useState('')
  const [message,setMessage] = useState('')
  const navigate = useNavigate()

  const handleReset = async (e) => {
    e.preventDefault()
    try{
      await sendPasswordResetEmail(auth,email)
      setMessage('Un email de réinitialisation a été envoyé !')
      setTimeout(() => navigate('/login'),3000)
    }catch(error){
      setMessage('Erreur : ' + error.message)
    }
  }
  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Réinitialiser le mot de passe</h3>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleReset}>
          <div className='mb-3'>
            <label htmlFor="email" className='form-label'>Adresse email</label>
            <input type="email" className='form-control' id='email' placeholder='Votre email' value={email}
            onChange={e => setEmail(e.target.value)} required/>
          </div>
          <button type='submit' className='btn btn-primary'>Envoyer le lien</button>
        </form>
    </div>
  )
}

export default ResetPassword
