// ============================================
// MENU CARD - Carte d'un plat du menu
// ============================================
// Affiche le nom, les ingrédients et le prix
// Différencie visuellement les bases pizza
// (tomate = rouge, crème fraîche = bleu)

import { motion } from "framer-motion";
import { useState } from "react";

export default function MenuCard({ item }) {
  // Détermine la base de la pizza pour le style visuel
  const isTomate = item.base === "tomate";
  const isCreme = item.base === "crème fraîche";

  // Style de fond selon la base + couleur du glow au hover
  const baseStyle = isTomate
    ? {
        bg: "linear-gradient(135deg, #7f1d1d, #1B4332)",
        glow: "rgba(239,68,68,0.3)",
      }
    : isCreme
      ? {
          bg: "linear-gradient(135deg, #1e3a5f, #1B4332)",
          glow: "rgba(59,130,246,0.3)",
        }
      : {
          bg: "linear-gradient(135deg, #2D6A4F, #1B4332)",
          glow: "rgba(255,183,3,0.3)",
        };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        y: -12,
        scale: 1.03,
        boxShadow: `0 30px 60px ${baseStyle.glow}, 0 0 30px ${baseStyle.glow}`,
        borderColor: "#FFB703",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        background: baseStyle.bg,
        border: "1px solid #40916C",
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-2xl overflow-hidden shadow-xl cursor-pointer ${!item.available ? "opacity-40 grayscale" : ""}`}
    >
      {/* Barre dorée animée en haut de la carte */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: "linear-gradient(90deg, #FFB703, #FFD60A, #FFB703)",
        }}
        className="h-1.5"
      />

      {/* Effet brillant qui passe au hover */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        whileHover={{ x: "100%", opacity: 0.1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-white pointer-events-none"
        style={{ transform: "skewX(-20deg)" }}
      />

      <div className="p-5 relative z-10">
        {/* NOM DU PLAT + badge indisponible */}
        <div className="flex justify-between items-start mb-2">
          <motion.h3
            whileHover={{ color: "#FFB703" }}
            className="text-xl font-black text-white leading-tight transition-colors duration-200"
          >
            {item.name}
          </motion.h3>

          {/* Badge clignotant si plat indisponible */}
          {!item.available && (
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="shrink-0 ml-2 text-xs px-2 py-0.5 rounded-full"
              style={{ background: "#ff000030", color: "#fca5a5" }}
            >
              Indispo
            </motion.span>
          )}
        </div>

        {/* LISTE DES INGRÉDIENTS */}
        <motion.p
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
          className="text-sm leading-relaxed mb-4 min-h-[2.5rem]"
          style={{ color: "#86efac" }}
        >
          {item.ingredients.join(" • ")}
        </motion.p>

        {/* PRIX - 3 tailles pour les pizzas, prix unique pour le reste */}
        {item.price_senior ? (
          // Pizzas: affiche les 3 tailles (Senior, Mega, Super Méga)
          <div
            className="rounded-xl p-3 space-y-2"
            style={{ background: "#00000040", border: "1px solid #40916C" }}
          >
            {[
              { label: "Senior", size: "28cm", price: item.price_senior },
              { label: "Mega", size: "33cm", price: item.price_mega },
              {
                label: "Super Méga",
                size: "40cm",
                price: item.price_super_mega,
              },
            ].map(({ label, size, price }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 6, borderRadius: "8px", paddingLeft: "8px" }}
                className="flex justify-between items-center py-0.5 transition-all duration-200"
              >
                <div>
                  <span className="text-white font-semibold text-sm">
                    {label}
                  </span>
                  <span className="text-xs ml-1" style={{ color: "#40916C" }}>
                    ({size})
                  </span>
                </div>
                <motion.span
                  whileHover={{ scale: 1.2, color: "#FFD60A" }}
                  className="font-black text-lg"
                  style={{ color: "#FFB703" }}
                >
                  {price}€
                </motion.span>
              </motion.div>
            ))}
          </div>
        ) : (
          // Autres plats: prix unique + étoile décorative
          <div className="flex items-center justify-between">
            <motion.span
              whileHover={{
                scale: 1.15,
                textShadow: "0 0 20px rgba(255,183,3,0.8)",
              }}
              className="text-4xl font-black"
              style={{ color: "#FFB703" }}
            >
              {item.price}€
            </motion.span>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-2xl"
            >
              ✨
            </motion.div>
          </div>
        )}
      </div>

      {/* Coin décoratif doré au hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute bottom-0 right-0 w-16 h-16 rounded-tl-full"
        style={{ background: "rgba(255,183,3,0.1)" }}
      />
    </motion.div>
  );
}
