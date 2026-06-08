// ============================================
// MENU PAGE - Affichage du menu par catégorie
// ============================================
// Affiche les plats groupés par sous-catégorie
// Pour les pizzas: sépare base tomate / crème fraîche
// Pour les autres: groupe par sub_category
// Gère aussi les résultats de recherche

import { motion } from "framer-motion";
import MenuCard from "../components/MenuCard";
import { CATEGORIES } from "../constants";

export default function MenuPage({ menu, activeCategory, search }) {
  // Tous les plats à plat (pour la recherche)
  const allItems = Object.values(menu).flat();

  // Filtrage par nom ou ingrédient si recherche active
  const searchResults = search
    ? allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.ingredients.some((i) =>
            i.toLowerCase().includes(search.toLowerCase()),
          ),
      )
    : [];

  // Plats de la catégorie active
  const items = menu[activeCategory] || [];

  // Séparation pizzas base tomate / crème fraîche
  const tomate = items.filter((item) => item.base === "tomate");
  const creme = items.filter((item) => item.base === "crème fraîche");

  // Plats sans base (toutes catégories sauf pizzas)
  const autres = items.filter((item) => !item.base);

  // Groupement par sous-catégorie (ex: Boeuf, Poulet, etc.)
  const groupedBySubCategory = autres.reduce((acc, item) => {
    const key = item.sub_category || "Autres";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  // Icônes associées aux sous-catégories
  const subCategoryIcons = {
    Boeuf: "🥩",
    Poulet: "🍗",
    Spécial: "⭐",
    Fromage: "🧀",
    Poisson: "🐟",
    Viande: "🥩",
    Légumes: "🥦",
    Divers: "🍽️",
    Maison: "🏠",
    Gâteaux: "🎂",
    Glaces: "🍦",
    Canettes: "🥤",
    Bouteilles: "🍶",
    Autres: "🍽️",
  };

  // Composant titre de section (Base Tomate, Boeuf, etc.)
  const SectionTitle = ({ icon, title, color, borderColor }) => (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2 mb-6"
    >
      <span className="text-2xl">{icon}</span>
      <h3 className="text-xl md:text-2xl font-black" style={{ color }}>
        {title}
      </h3>
      <div className="flex-1 h-px ml-2" style={{ background: borderColor }} />
    </motion.div>
  );

  // Grille animée de cards avec stagger
  const Grid = ({ items }) => (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          }}
        >
          <MenuCard item={item} />
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto px-4 py-6 md:py-8"
    >
      {/* MODE RECHERCHE */}
      {search ? (
        <div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-black mb-6 pb-3 border-b"
            style={{ color: "#FFB703", borderColor: "#2D6A4F" }}
          >
            🔍 Résultats pour "{search}" ({searchResults.length})
          </motion.h2>

          {/* Message si aucun résultat */}
          {searchResults.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <p className="text-6xl mb-4">😕</p>
              <p className="text-xl font-bold" style={{ color: "#86efac" }}>
                Aucun plat trouvé
              </p>
            </motion.div>
          ) : (
            <Grid items={searchResults} />
          )}
        </div>
      ) : (
        // MODE NAVIGATION PAR CATÉGORIE
        <div>
          {/* Titre de la catégorie active */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-black mb-8 md:mb-10 pb-3 border-b"
            style={{ color: "#FFB703", borderColor: "#2D6A4F" }}
          >
            {CATEGORIES[activeCategory]}
          </motion.h2>

          {/* Section pizzas base tomate */}
          {tomate.length > 0 && (
            <div className="mb-10 md:mb-12">
              <SectionTitle
                icon="🍅"
                title="Base Tomate"
                color="#ef4444"
                borderColor="#7f1d1d50"
              />
              <Grid items={tomate} />
            </div>
          )}

          {/* Section pizzas base crème fraîche */}
          {creme.length > 0 && (
            <div className="mb-10 md:mb-12">
              <SectionTitle
                icon="🥛"
                title="Base Crème Fraîche"
                color="#93c5fd"
                borderColor="#1e3a5f50"
              />
              <Grid items={creme} />
            </div>
          )}

          {/* Sections par sous-catégorie (Boeuf, Poulet, etc.) */}
          {Object.entries(groupedBySubCategory).map(([subCat, subItems]) => (
            <div key={subCat} className="mb-10 md:mb-12">
              <SectionTitle
                icon={subCategoryIcons[subCat] || "🍽️"}
                title={subCat}
                color="#FFB703"
                borderColor="#2D6A4F50"
              />
              <Grid items={subItems} />
            </div>
          ))}
        </div>
      )}
    </motion.main>
  );
}
