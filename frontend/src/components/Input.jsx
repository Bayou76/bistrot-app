// ============================================
// INPUT - Composant champ de saisie réutilisable
// ============================================
// Utilisé dans les formulaires admin (Modal)
// Style cohérent avec le thème vert/or du bistrot

export default function Input({ ...props }) {
  return (
    <input
      // Style de base: fond sombre, bordure verte, texte blanc
      // Focus: bordure dorée pour indiquer la sélection
      className="w-full bg-green-950 border border-green-700 rounded-lg px-4 py-2 text-white placeholder-green-600 focus:outline-none focus:border-yellow-400"
      {...props}
    />
  );
}