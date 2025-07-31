import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { confirmPasswordReset } from 'firebase/auth'
import { auth } from '../Firebase/Firebase'
import { Eye, EyeOff } from 'lucide-react'

function ConfirmResetPassword() {
  const [searchParams] = useSearchParams()
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [oobCode, setOobCode] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const code = searchParams.get('oobCode')
    if (!code) {
      setMessage("Lien invalide ou expiré.")
    } else {
      setOobCode(code)
    }
  }, [searchParams])

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (!oobCode) return
    try {
      await confirmPasswordReset(auth, oobCode, newPassword)
      setMessage("✅ Mot de passe réinitialisé avec succès.")
      setTimeout(() => navigate('/login'), 3000)
    } catch (error) {
  console.error("Erreur lors de la réinitialisation :", error)
  switch (error.code) {
    case "auth/expired-action-code":
      setMessage("❌ Le lien de réinitialisation a expiré. Veuillez en demander un nouveau.");
      break;
    case "auth/invalid-action-code":
      setMessage("❌ Le lien de réinitialisation est invalide ou a déjà été utilisé.");
      break;
    case "auth/user-disabled":
      setMessage("❌ Ce compte est désactivé.");
      break;
    case "auth/weak-password":
      setMessage("❌ Le mot de passe est trop faible (minimum 6 caractères).");
      break;
    default:
      setMessage("❌ Une erreur s'est produite. Veuillez réessayer.");
  }
}

  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="mb-4 text-center">🔒 Nouveau mot de passe</h3>
        {message && <div className="alert alert-info">{message}</div>}
        {oobCode && (
          <form onSubmit={handleResetPassword}>
            <div className='mb-3'>
              <label htmlFor="password" className='form-label'>Nouveau mot de passe</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-success w-100">Réinitialiser</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ConfirmResetPassword
