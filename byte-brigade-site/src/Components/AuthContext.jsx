import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark";
    });
    
    const [currentUser, setCurrentUser] = useState(() => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser || storedUser === "undefined") return null;
  try {
    return JSON.parse(storedUser);
  } catch (e) {
    console.error("Erreur parsing user depuis localStorage:", e);
    return null;
  }
});

  
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('user', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('user');
        }
    }, [currentUser]);

    useEffect(() => {
        localStorage.setItem("theme", darkMode ? "dark" : "light");
        document.body.classList.toggle("dark-mode", darkMode);
        document.documentElement.classList.toggle("dark-mode", darkMode);
    }, [darkMode]);

    return (
        <AuthContext.Provider 
            value={{ 
                currentUser, 
                setCurrentUser,
                darkMode,
                setDarkMode
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};