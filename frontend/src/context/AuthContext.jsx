// ============================================
// AUTH CONTEXT - Gestion de l'authentification
// ============================================
// Fournit le token JWT et les fonctions login/logout
// à tous les composants enfants via React Context

import { createContext, useContext, useState } from "react";

// Création du contexte d'authentification
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte auth
// Usage: const { token, isAdmin, login, logout } = useAuth();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  // Récupère le token depuis le localStorage au démarrage
  const [token, setToken] = useState(localStorage.getItem("admin_token") || "");

  // isAdmin est true si un token existe dans le localStorage
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem("admin_token"));

  // Connexion: envoie email + password à l'API et récupère le token JWT
  const login = async (password) => {
    const res = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@bistrot.fr", password }),
    });
    const data = await res.json();

    if (data.token) {
      // Sauvegarde le token en mémoire et dans le localStorage
      setToken(data.token);
      setIsAdmin(true);
      localStorage.setItem("admin_token", data.token);
      return true;
    }
    return false;
  };

  // Déconnexion: révoque le token côté serveur et nettoie le localStorage
  const logout = async () => {
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    setToken("");
    setIsAdmin(false);
    localStorage.removeItem("admin_token");
  };

  return (
    // Expose token, isAdmin, login et logout à tous les composants enfants
    <AuthContext.Provider value={{ token, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
