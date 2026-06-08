// ============================================
// NAVBAR - Barre de navigation principale
// ============================================
// Affiche le logo, les boutons de navigation
// et la barre de recherche sur la page menu

import { motion } from "framer-motion";
import { CATEGORIES } from "../constants";

export default function Navbar({
  page,
  setPage,
  activeCategory,
  setActiveCategory,
  search,
  setSearch,
}) {
  return (
    <>
      <header
        style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F)" }}
        className="shadow-2xl"
      >
        <div className="max-w-6xl mx-auto px-6 py-6 text-center">
          {/* LOGO + TITRE */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-5xl md:text-6xl">🍕</span>
            <div>
              <h1
                className="text-3xl md:text-5xl font-black"
                style={{ color: "#FFB703" }}
              >
                Bistrot des Hauts
              </h1>
              <p
                className="text-xs md:text-sm mt-1"
                style={{ color: "#86efac" }}
              >
                Pizza • Snack • Café • À emporter
              </p>
            </div>
          </motion.div>

          {/* BOUTONS DE NAVIGATION */}
          <motion.div
            className="flex justify-center gap-2 md:gap-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              { label: "🏠", fullLabel: "🏠 Accueil", key: "home" },
              { label: "🍽️", fullLabel: "🍽️ Menu", key: "menu" },
              { label: "⚙️", fullLabel: "⚙️ Admin", key: "admin" },
            ].map((btn) => (
              <motion.button
                key={btn.key}
                onClick={() => setPage(btn.key)}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={
                  page === btn.key
                    ? { background: "#FFB703", color: "#1B4332" }
                    : {
                        border: "2px solid #FFB703",
                        color: "#FFB703",
                        background: "transparent",
                      }
                }
                className="px-4 md:px-6 py-2 rounded-full font-black text-xs md:text-sm"
              >
                {/* Emoji seul sur mobile, texte complet sur desktop */}
                <span className="md:hidden">{btn.label}</span>
                <span className="hidden md:inline">{btn.fullLabel}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* BARRE DE RECHERCHE - visible uniquement sur la page menu */}
          {page === "menu" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="max-w-md mx-auto relative flex items-center"
            >
              {/* Icône loupe */}
              <span className="absolute left-4 text-lg pointer-events-none">
                🔍
              </span>

              {/* Input de recherche */}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un plat..."
                className="w-full pl-10 pr-10 py-2.5 rounded-full font-semibold text-white placeholder-green-400 focus:outline-none"
                style={{ background: "#1B4332", border: "2px solid #40916C" }}
              />

              {/* Bouton effacer la recherche */}
              {search && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSearch("")}
                  className="absolute right-4 text-green-400 hover:text-white font-black text-sm"
                >
                  ✕
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
      </header>

      {/* CATEGORIES - visible uniquement sur le menu sans recherche active */}
      {page === "menu" && !search && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: "#1B4332", borderBottom: "2px solid #2D6A4F" }}
          className="sticky top-0 z-40 shadow-xl overflow-x-auto"
        >
          {/* Scrollable horizontalement sur mobile */}
          <div className="px-4 py-3 flex gap-2 justify-start md:justify-center min-w-max md:min-w-0 mx-auto">
            {Object.entries(CATEGORIES).map(([key, label]) => (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={
                  activeCategory === key
                    ? { background: "#FFB703", color: "#1B4332" }
                    : { background: "#2D6A4F", color: "#d1fae5" }
                }
                className="px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-black whitespace-nowrap"
              >
                {label}
              </motion.button>
            ))}
          </div>
        </motion.nav>
      )}
    </>
  );
}
