import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const id = localStorage.getItem('userId');

    if (username && id) {
      setUser({ username, id });
    }
  }, []);

  const login = ({ username, id }) => {
    localStorage.setItem('username', username);
    localStorage.setItem('userId', id);
    setUser({ username, id });
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
