import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Load user and token from localStorage on app initialization
    const username = localStorage.getItem('username');
    const id = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token'); // Load token

    console.log('AuthContext useEffect: Loaded from localStorage', { username, id, storedToken });

    if (username && id && storedToken) {
      setUser({ username, id });
      setToken(storedToken);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
    }
  }, []);

  const login = ({ username, id, token }) => {
    localStorage.setItem('username', username);
    localStorage.setItem('userId', id);
    localStorage.setItem('token', token);
    setUser({ username, id });
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
