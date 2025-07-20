import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if(!user){
            navigate("/login")
        }
    },[user,navigate])

    if(!user)
        return null
    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')
        window.location.reload()
    }
  return (
    <div className='container mt-5'>
      <h1>Profil de {user.prenom} {user.nom}</h1>
      <p>Email : {user.email}</p>
      <p>Rôle : {user.role}</p>

      <button className='btn btn-danger mt-3' onClick={handleLogout}>
        Se déconnecter
      </button>
    </div>
  )
}

export default Profile
