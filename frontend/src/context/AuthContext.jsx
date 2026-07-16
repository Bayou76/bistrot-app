// ============================================
// AUTH CONTEXT - Gestion de l'authentification
// ============================================
// Fournit le token JWT et les fonctions login/logout
// à tous les composants enfants via React Context


import { createContext, useContext, useState } from "react";
import { API } from "../constants";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("admin_token") || "");
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem("admin_token"));

  // Connexion
  const login = async (password) => {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@bistrot.fr", password }),
    });
    const data = await res.json();

    if (data.token) {
      setToken(data.token);
      setIsAdmin(true);
      localStorage.setItem("admin_token", data.token);
      return true;
    }
    return false;
  };

  // Déconnexion
  const logout = async () => {
    await fetch(`${API}/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    setToken("");
    setIsAdmin(false);
    localStorage.removeItem("admin_token");
  };

  return (
    <AuthContext.Provider value={{ token, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}