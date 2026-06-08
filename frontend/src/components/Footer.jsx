// ============================================
// FOOTER - Pied de page du bistrot
// ============================================

import { motion } from "framer-motion";

export default function Footer({ settings, setPage }) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        background: "linear-gradient(135deg, #1B4332, #2D6A4F)",
        borderTop: "2px solid #FFB703",
      }}
      className="px-6 py-8"
    >
      <div className="max-w-6xl mx-auto flex flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-xs" style={{ color: "#86efac" }}>
          © 2024 Bistrot des Hauts - Tous droits réservés
        </p>

        {/* Développeur */}
        <motion.p
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs font-black"
          style={{ color: "#86efac" }}
        >
          ✨ Développé par{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #FFB703, #FFD60A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "0.9rem",
              letterSpacing: "0.05em",
            }}
          >
            Sebia Baya
          </span>{" "}
          ✨
        </motion.p>

        {/* Adresse */}
        <p className="text-xs" style={{ color: "#86efac" }}>
          6 bis rue François Couperin, 76000 Rouen
        </p>
      </div>
    </motion.footer>
  );
}
