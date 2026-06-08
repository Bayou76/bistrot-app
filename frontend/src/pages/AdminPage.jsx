import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { CATEGORIES, API } from "../constants";
import Modal from "../components/Modal";

const EMPTY_FORM = {
  name: "",
  category: "pizzas",
  ingredients: "",
  price: "",
  price_senior: "",
  price_mega: "",
  price_super_mega: "",
  available: true,
};

export default function AdminPage({
  menu,
  fetchMenu,
  settings,
  fetchSettings,
  onLogout,
}) {
  const { token } = useAuth();
  const [editItem, setEditItem] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [activeTab, setActiveTab] = useState("menu");
  const [settingsForm, setSettingsForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ce plat?")) return;
    await fetch(`${API}/admin/menu/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchMenu();
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setForm({
      name: item.name,
      category: item.category,
      ingredients: item.ingredients.join(", "),
      price: item.price || "",
      price_senior: item.price_senior || "",
      price_mega: item.price_mega || "",
      price_super_mega: item.price_super_mega || "",
      available: item.available,
    });
  };

  const handleSave = async () => {
    const body = {
      ...form,
      ingredients: form.ingredients.split(",").map((i) => i.trim()),
    };
    await fetch(`${API}/admin/menu/${editItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    setEditItem(null);
    fetchMenu();
  };

  const handleAdd = async () => {
    const body = {
      ...form,
      ingredients: form.ingredients.split(",").map((i) => i.trim()),
    };
    await fetch(`${API}/admin/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    setShowAdd(false);
    setForm(EMPTY_FORM);
    fetchMenu();
  };

  const handleSaveSettings = async () => {
    await fetch(`${API}/admin/settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(settingsForm),
    });
    fetchSettings();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-black"
          style={{ color: "#FFB703" }}
        >
          ⚙️ Gestion du Bistrot
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLogout}
          className="font-bold px-4 py-2 rounded-lg transition"
          style={{ background: "#2D6A4F", color: "white" }}
        >
          🚪 Déconnexion
        </motion.button>
      </div>

      {/* TABS */}
      <div className="flex gap-3 mb-8">
        {[
          { key: "menu", label: "🍽️ Menu" },
          { key: "settings", label: "⚙️ Paramètres" },
        ].map((tab) => (
          <motion.button
            key={tab.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.key)}
            style={
              activeTab === tab.key
                ? { background: "#FFB703", color: "#1B4332" }
                : { background: "#2D6A4F", color: "#d1fae5" }
            }
            className="px-6 py-2.5 rounded-full font-black text-sm transition"
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ONGLET MENU */}
        {activeTab === "menu" && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(255,183,3,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setForm(EMPTY_FORM);
                setShowAdd(true);
              }}
              style={{ background: "#FFB703", color: "#1B4332" }}
              className="font-black px-6 py-2.5 rounded-lg mb-6 transition"
            >
              + Ajouter un plat
            </motion.button>

            <AnimatePresence>
              {showAdd && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                >
                  <motion.div
                    initial={{ scale: 0.8, y: 40 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: 40 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Modal
                      title="Nouveau plat"
                      form={form}
                      setForm={setForm}
                      onConfirm={handleAdd}
                      onCancel={() => setShowAdd(false)}
                      isEdit={false}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {editItem && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                >
                  <motion.div
                    initial={{ scale: 0.8, y: 40 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: 40 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Modal
                      title={`Modifier: ${editItem.name}`}
                      form={form}
                      setForm={setForm}
                      onConfirm={handleSave}
                      onCancel={() => setEditItem(null)}
                      isEdit={true}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-8">
              {Object.entries(menu).map(([category, items], ci) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ci * 0.05 }}
                >
                  <h3
                    className="text-xl font-black mb-3 pb-2 border-b"
                    style={{ color: "#FFB703", borderColor: "#2D6A4F" }}
                  >
                    {CATEGORIES[category]}
                  </h3>
                  <div className="space-y-2">
                    {items.map((item, ii) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: ii * 0.03 }}
                        whileHover={{ x: 4, background: "rgba(45,106,79,0.8)" }}
                        className={`flex justify-between items-center rounded-xl px-5 py-3 border transition-all ${!item.available ? "opacity-50" : ""}`}
                        style={{
                          background: "#2D6A4F",
                          borderColor: "#40916C",
                        }}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">
                              {item.name}
                            </span>
                            {!item.available && (
                              <span className="text-xs bg-red-900 text-red-300 px-2 py-0.5 rounded-full">
                                Indispo
                              </span>
                            )}
                          </div>
                          <p className="text-sm" style={{ color: "#86efac" }}>
                            {item.ingredients.join(", ")}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className="font-black text-sm"
                            style={{ color: "#FFB703" }}
                          >
                            {item.price_senior
                              ? `${item.price_senior}€ / ${item.price_mega}€ / ${item.price_super_mega}€`
                              : `${item.price}€`}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEdit(item)}
                            className="px-3 py-1.5 rounded-lg text-sm"
                            style={{ background: "#1B4332", color: "white" }}
                          >
                            ✏️
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(item.id)}
                            className="px-3 py-1.5 rounded-lg text-sm bg-red-900 text-white"
                          >
                            🗑️
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ONGLET SETTINGS */}
        {activeTab === "settings" && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Promo */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "#2D6A4F", border: "1px solid #40916C" }}
            >
              <h3
                className="text-xl font-black mb-4"
                style={{ color: "#FFB703" }}
              >
                🎉 Promotion
              </h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsForm.promo_active === "true"}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        promo_active: e.target.checked ? "true" : "false",
                      })
                    }
                    className="w-5 h-5 accent-yellow-400"
                  />
                  <span className="text-white font-semibold">Promo active</span>
                </label>
                <input
                  value={settingsForm.promo_text || ""}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      promo_text: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg text-white"
                  style={{ background: "#1B4332", border: "1px solid #40916C" }}
                  placeholder="Texte de la promotion"
                />
              </div>
            </div>

            {/* Accueil */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "#2D6A4F", border: "1px solid #40916C" }}
            >
              <h3
                className="text-xl font-black mb-4"
                style={{ color: "#FFB703" }}
              >
                🏠 Page d'accueil
              </h3>
              <div className="space-y-3">
                <input
                  value={settingsForm.welcome_title || ""}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      welcome_title: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg text-white"
                  style={{ background: "#1B4332", border: "1px solid #40916C" }}
                  placeholder="Titre"
                />
                <input
                  value={settingsForm.welcome_subtitle || ""}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      welcome_subtitle: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg text-white"
                  style={{ background: "#1B4332", border: "1px solid #40916C" }}
                  placeholder="Sous-titre"
                />
              </div>
            </div>

            {/* Contact */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "#2D6A4F", border: "1px solid #40916C" }}
            >
              <h3
                className="text-xl font-black mb-4"
                style={{ color: "#FFB703" }}
              >
                📍 Contact
              </h3>
              <div className="space-y-3">
                <input
                  value={settingsForm.address || ""}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      address: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg text-white"
                  style={{ background: "#1B4332", border: "1px solid #40916C" }}
                  placeholder="Adresse"
                />
                <input
                  value={settingsForm.phone || ""}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg text-white"
                  style={{ background: "#1B4332", border: "1px solid #40916C" }}
                  placeholder="Téléphone"
                />
              </div>
            </div>

            {/* Horaires */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "#2D6A4F", border: "1px solid #40916C" }}
            >
              <h3
                className="text-xl font-black mb-4"
                style={{ color: "#FFB703" }}
              >
                🕐 Horaires
              </h3>
              <div className="space-y-3">
                {[
                  { key: "hours_lundi", label: "Lundi" },
                  { key: "hours_mardi_jeudi", label: "Mardi - Jeudi" },
                  { key: "hours_vendredi_samedi", label: "Vendredi - Samedi" },
                  { key: "hours_dimanche", label: "Dimanche" },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center gap-3">
                    <span
                      className="w-40 text-sm font-semibold"
                      style={{ color: "#86efac" }}
                    >
                      {label}
                    </span>
                    <input
                      value={settingsForm[key] || ""}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          [key]: e.target.value,
                        })
                      }
                      className="flex-1 px-4 py-2 rounded-lg text-white"
                      style={{
                        background: "#1B4332",
                        border: "1px solid #40916C",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bouton sauvegarder */}
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0 8px 25px rgba(255,183,3,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSaveSettings}
              style={{ background: "#FFB703", color: "#1B4332" }}
              className="w-full font-black py-3 rounded-xl text-lg"
            >
              {saved ? "✅ Sauvegardé!" : "💾 Sauvegarder"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
