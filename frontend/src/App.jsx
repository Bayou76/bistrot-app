// ============================================
// APP.JSX - Point d'entrée principal
// ============================================
// Gère la navigation entre les pages et
// charge les données du menu et des settings

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { API } from "./constants";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";

// Variants d'animation pour les transitions entre pages
const pageVariants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 1.05, y: -20, transition: { duration: 0.3 } },
};

function AppContent() {
  const { isAdmin, logout } = useAuth();

  // État du menu groupé par catégorie
  const [menu, setMenu] = useState({});

  // Paramètres du site (promo, horaires, contact)
  const [settings, setSettings] = useState({});

  // Catégorie active dans le menu
  const [activeCategory, setActiveCategory] = useState("pizzas");

  // Texte de recherche dans le menu
  const [search, setSearch] = useState("");

  // Page active: "home" | "menu" | "admin"
  const [page, setPage] = useState("home");

  // Chargement initial des données
  useEffect(() => {
    fetchMenu();
    fetchSettings();
  }, []);

  // Récupère le menu depuis l'API Laravel
  const fetchMenu = () => {
    fetch(`${API}/menu`)
      .then((r) => r.json())
      .then(setMenu);
  };

  // Récupère les paramètres depuis l'API Laravel
  const fetchSettings = () => {
    fetch(`${API}/settings`)
      .then((r) => r.json())
      .then(setSettings);
  };

  // Déconnexion admin et redirection vers l'accueil
  const handleLogout = async () => {
    await logout();
    setPage("home");
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#1B4332" }}
    >
      {/* Navbar cachée sur la page d'accueil */}
      {page !== "home" && (
        <Navbar
          page={page}
          setPage={setPage}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          search={search}
          setSearch={setSearch}
          settings={settings}
        />
      )}

      {/* Contenu principal avec transitions animées */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {/* Page d'accueil */}
          {page === "home" && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <HomePage settings={settings} setPage={setPage} />
            </motion.div>
          )}

          {/* Page menu */}
          {page === "menu" && (
            <motion.div
              key="menu"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <MenuPage
                menu={menu}
                activeCategory={activeCategory}
                search={search}
              />
            </motion.div>
          )}

          {/* Page login admin (si non connecté) */}
          {page === "admin" && !isAdmin && (
            <motion.div
              key="login"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <LoginPage onSuccess={() => setPage("admin")} />
            </motion.div>
          )}

          {/* Dashboard admin (si connecté) */}
          {page === "admin" && isAdmin && (
            <motion.div
              key="admin"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <AdminPage
                menu={menu}
                fetchMenu={fetchMenu}
                settings={settings}
                fetchSettings={fetchSettings}
                onLogout={handleLogout}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer visible sur toutes les pages sauf admin */}
      {page !== "admin" && <Footer settings={settings} setPage={setPage} />}
    </div>
  );
}

// Enveloppe l'app dans le provider d'authentification
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
