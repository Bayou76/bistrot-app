// ============================================
// HOME PAGE - Page d'accueil du bistrot
// ============================================

import { motion } from "framer-motion";
import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { TypeAnimation } from "react-type-animation";

export default function HomePage({ settings, setPage }) {

  const particlesLoaded = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div style={{ background: '#1B4332' }} className="min-h-screen overflow-hidden">

      {/* HEADER */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ background: 'rgba(45, 106, 79, 0.95)', backdropFilter: 'blur(10px)' }}
        className="py-4 px-6 flex justify-between items-center shadow-xl sticky top-0 z-50"
      >
        <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
          <motion.span
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-3xl"
          >🍕</motion.span>
          <span className="text-xl md:text-2xl font-black" style={{ color: '#FFB703' }}>
            Bistrot des Hauts
          </span>
        </motion.div>
        <div className="flex gap-2 md:gap-3">
          <motion.button
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
            onClick={() => setPage('menu')}
            style={{ background: '#FFB703', color: '#1B4332' }}
            className="px-4 py-2 rounded-full font-black text-xs md:text-sm shadow-lg"
          >
            🍽️ Menu
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
            onClick={() => setPage('admin')}
            style={{ border: '2px solid #FFB703', color: '#FFB703', background: 'transparent' }}
            className="px-4 py-2 rounded-full font-black text-xs md:text-sm"
          >
            ⚙️ Admin
          </motion.button>
        </div>
      </motion.div>

      {/* BANNIÈRE PROMO */}
      {settings.promo_active === 'true' && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ background: 'linear-gradient(90deg, #FFB703, #FFD60A, #FFB703)' }}
          className="py-3 px-4 text-center overflow-hidden"
        >
          <p className="font-black text-green-900 text-sm md:text-base animate-pulse">
            🎉 {settings.promo_text} 🎉
          </p>
        </motion.div>
      )}

      {/* HERO */}
      <div
        style={{ background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #1B4332 100%)' }}
        className="py-28 px-6 text-center relative overflow-hidden min-h-screen flex items-center justify-center"
      >
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            particles: {
              color: { value: "#FFB703" },
              links: { color: "#FFB703", distance: 150, enable: true, opacity: 0.1, width: 1 },
              move: { enable: true, speed: 0.8 },
              number: { density: { enable: true }, value: 40 },
              opacity: { value: 0.15 },
              size: { value: { min: 1, max: 4 } },
            },
          }}
          className="absolute inset-0"
        />

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-20 w-64 h-64 rounded-full"
          style={{ background: '#FFB703' }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full"
          style={{ background: '#FFB703' }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.6 }}
          >
            <motion.span
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-9xl block mb-6"
            >🍕</motion.span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-7xl font-black mb-4 leading-tight"
            style={{ color: '#FFB703', textShadow: '0 0 40px rgba(255,183,3,0.3)' }}
          >
            {settings.welcome_title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-2xl mb-10 font-semibold"
            style={{ color: '#86efac' }}
          >
            <TypeAnimation
              sequence={[
                'Pizza à Rouen 🍕', 2000,
                'Snack & Café ☕', 2000,
                'À emporter ou sur place 🥡', 2000,
                '1 pizza achetée = 1 offerte! 🎉', 2000,
              ]}
              repeat={Infinity}
              speed={50}
            />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 50px rgba(255,183,3,0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage('menu')}
            style={{ background: '#FFB703', color: '#1B4332' }}
            className="px-10 md:px-14 py-4 md:py-5 rounded-full font-black text-xl md:text-2xl shadow-2xl"
          >
            Voir le Menu 🍽️
          </motion.button>
        </div>
      </div>

      {/* INFOS */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.03, boxShadow: "0 25px 50px rgba(0,0,0,0.4)" }}
          className="rounded-2xl p-6"
          style={{ background: '#2D6A4F', border: '1px solid #40916C' }}
        >
          <h2 className="text-2xl font-black mb-4" style={{ color: '#FFB703' }}>📍 Nous trouver</h2>
          <p className="text-white font-semibold mb-4">{settings.address}</p>
          <motion.p whileHover={{ scale: 1.05 }} className="text-xl font-black" style={{ color: '#FFB703' }}>
            📞 {settings.phone}
          </motion.p>
        </motion.div>

        {/* Horaires */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.03, boxShadow: "0 25px 50px rgba(0,0,0,0.4)" }}
          className="rounded-2xl p-6"
          style={{ background: '#2D6A4F', border: '1px solid #40916C' }}
        >
          <h2 className="text-2xl font-black mb-4" style={{ color: '#FFB703' }}>🕐 Horaires</h2>
          <div className="space-y-3 text-sm">
            {[
              { day: 'Lundi', hours: settings.hours_lundi, closed: true },
              { day: 'Mardi - Jeudi', hours: settings.hours_mardi_jeudi },
              { day: 'Vendredi - Samedi', hours: settings.hours_vendredi_samedi },
              { day: 'Dimanche', hours: settings.hours_dimanche },
            ].map((item, i) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex justify-between items-center py-1.5 border-b"
                style={{ borderColor: '#40916C40' }}
              >
                <span style={{ color: '#86efac' }}>{item.day}</span>
                <span className={`font-bold ${item.closed ? 'text-red-400' : 'text-white'}`}>{item.hours}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Catégories */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 rounded-2xl p-6"
          style={{ background: '#2D6A4F', border: '1px solid #40916C' }}
        >
          <h2 className="text-2xl font-black mb-6" style={{ color: '#FFB703' }}>🍽️ Notre carte</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: '🍕 Pizzas', cat: 'pizzas' },
              { label: '🌮 Tacos', cat: 'tacos' },
              { label: '🍔 Burgers', cat: 'burgers' },
              { label: '🥖 Sandwichs', cat: 'sandwichs' },
              { label: '🧀 Tex Mex', cat: 'texmex' },
              { label: '🥪 Paninis', cat: 'paninis' },
              { label: '👶 Menu Enfant', cat: 'menuenfant' },
              { label: '🍰 Desserts', cat: 'desserts' },
              { label: '🥤 Boissons', cat: 'boissons' },
            ].map((item) => (
              <motion.span
                key={item.cat}
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage('menu')}
                className="px-5 py-2.5 rounded-full font-bold cursor-pointer"
                style={{ background: '#1B4332', color: '#FFB703', border: '2px solid #FFB703' }}
              >
                {item.label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}