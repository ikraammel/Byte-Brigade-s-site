import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  useEffect(() => {
    // Optionnel : pour sync localStorage à chaque changement
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser ,currentUser, setCurrentUser, darkMode, setDarkMode }}>
      {children}
    </AuthContext.Provider>
  );
};
