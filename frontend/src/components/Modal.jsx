// ============================================
// MODAL - Formulaire d'ajout/modification plat
// ============================================
// Utilisé dans AdminPage pour ajouter ou modifier
// un plat du menu. Adapte les champs selon la
// catégorie (pizzas = 3 prix, autres = 1 prix)

import Input from "./Input";
import { CATEGORIES } from "../constants";

export default function Modal({
  title,
  form,
  setForm,
  onConfirm,
  onCancel,
  isEdit,
}) {
  return (
    <div className="bg-green-900 rounded-2xl p-6 w-full max-w-md border-2 border-green-700 space-y-4">
      {/* Titre du modal (Nouveau plat / Modifier: nom) */}
      <h3 className="text-xl font-black text-yellow-400">{title}</h3>

      {/* Champ nom du plat */}
      <Input
        placeholder="Nom"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      {/* Sélecteur de catégorie - uniquement à la création */}
      {!isEdit && (
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full bg-green-950 border border-green-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400"
        >
          {Object.keys(CATEGORIES).map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      )}

      {/* Champ ingrédients séparés par virgule */}
      <Input
        placeholder="Ingrédients (séparés par virgule)"
        value={form.ingredients}
        onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
      />

      {/* Prix: 3 champs pour pizzas, 1 seul pour les autres */}
      {form.category === "pizzas" ? (
        <>
          {/* Prix Senior (28cm) */}
          <Input
            placeholder="Prix Senior (28cm)"
            value={form.price_senior}
            onChange={(e) => setForm({ ...form, price_senior: e.target.value })}
          />
          {/* Prix Mega (33cm) */}
          <Input
            placeholder="Prix Mega (33cm)"
            value={form.price_mega}
            onChange={(e) => setForm({ ...form, price_mega: e.target.value })}
          />
          {/* Prix Super Méga (40cm) */}
          <Input
            placeholder="Prix Super Méga (40cm)"
            value={form.price_super_mega}
            onChange={(e) =>
              setForm({ ...form, price_super_mega: e.target.value })
            }
          />
        </>
      ) : (
        // Prix unique pour les autres catégories
        <Input
          placeholder="Prix"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
      )}

      {/* Checkbox disponibilité - uniquement en mode édition */}
      {isEdit && (
        <label className="flex items-center gap-2 text-green-200 cursor-pointer">
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e) => setForm({ ...form, available: e.target.checked })}
            className="w-4 h-4 accent-yellow-400"
          />
          Disponible
        </label>
      )}

      {/* Boutons confirmer / annuler */}
      <div className="flex gap-3">
        <button
          onClick={onConfirm}
          className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-green-900 font-black py-2 rounded-lg transition"
        >
          {/* Texte adapté selon le mode */}
          {isEdit ? "Sauvegarder" : "Ajouter"}
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-green-800 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
