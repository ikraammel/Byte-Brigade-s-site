import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRouteAdmin({children}) {
    const user = JSON.parse(localStorage.getItem('user'))

    if(!user || user.role !== "admin"){
        return <Navigate to={"/login"} replace />
    }
    //si autorisé , affiche le contenu enfant (ex : <Admin/>)
  return children
}

export default ProtectedRouteAdmin
