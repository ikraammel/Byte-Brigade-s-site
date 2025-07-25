import React, { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../Firebase/Firebase'
import { useNavigate } from 'react-router-dom'

function ResetPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleReset = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (!email) {
      setError('Veuillez saisir votre email')
      return
    }

    try {
      await sendPasswordResetEmail(auth, email, {
        url: 'https://bytebrigade.netlify.app/reset-confirm', // Page où l'utilisateur va définir son nouveau mdp
        handleCodeInApp: true // Indique que le lien doit être traité dans l'app front (React)
      })
      setMessage('✅ Email de réinitialisation envoyé. Vérifiez votre boîte mail (y compris les spams).')
      setTimeout(() => navigate('/login'), 5000) // Redirige après 5s
    } catch (err) {
      console.error('Erreur envoi mail réinitialisation:', err)
      setError('❌ Erreur : ' + err.message)
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Réinitialiser le mot de passe</h3>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleReset}>
        <div className='mb-3'>
          <label htmlFor="email" className='form-label'>Adresse email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Envoyer le lien</button>
      </form>
    </div>
  )
}

export default ResetPassword
