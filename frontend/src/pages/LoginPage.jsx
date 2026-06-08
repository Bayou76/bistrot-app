// ============================================
// LOGIN PAGE - Page de connexion admin
// ============================================
// Formulaire de connexion pour accéder au
// tableau de bord administrateur
// Utilise le contexte AuthContext pour login

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import Input from "../components/Input";

export default function LoginPage({ onSuccess }) {
  const { login } = useAuth();

  // État du mot de passe saisi
  const [password, setPassword] = useState("");

  // Message d'erreur si mot de passe incorrect
  const [error, setError] = useState("");

  // État de chargement pendant la requête
  const [loading, setLoading] = useState(false);

  // Tentative de connexion
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const success = await login(password);

    if (success) {
      // Redirection vers l'admin si connexion réussie
      onSuccess();
    } else {
      setError("Mot de passe incorrect");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="bg-green-900 rounded-2xl p-8 w-full max-w-sm border-2 border-green-700 shadow-2xl"
      >
        {/* Titre */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-black text-yellow-400 text-center mb-6"
        >
          🔐 Accès Admin
        </motion.h2>

        <div className="space-y-4">
          {/* Champ mot de passe */}
          <Input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // Connexion au Enter
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />

          {/* Message d'erreur */}
          {error && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-400 text-sm text-center font-semibold"
            >
              {error}
            </motion.p>
          )}

          {/* Bouton connexion */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-green-900 font-black py-2.5 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
