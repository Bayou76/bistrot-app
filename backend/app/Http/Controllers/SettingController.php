<?php

// ============================================
// SETTING CONTROLLER
// ============================================
// Gère les paramètres du site (promo, horaires,
// contact, textes d'accueil)
// GET  /api/settings       -> index()  (public)
// POST /api/admin/settings -> update() (admin)

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Récupère tous les paramètres sous forme clé/valeur
     * Exemple: { "promo_active": "true", "phone": "02 78 81 80 83" }
     * Utilisé par le frontend pour afficher les infos du site
     */
    public function index()
    {
        // pluck('value', 'key') transforme la collection en tableau clé/valeur
        $settings = Setting::all()->pluck('value', 'key');
        return response()->json($settings);
    }

    /**
     * Met à jour un ou plusieurs paramètres (admin uniquement)
     * Utilise updateOrCreate pour créer si inexistant
     *
     * @param Request $request tableau de clé/valeur
     * Exemple body: { "promo_active": "true", "phone": "06 12 34 56 78" }
     */
    public function update(Request $request)
    {
        foreach ($request->all() as $key => $value) {
            Setting::updateOrCreate(
                ['key'   => $key],   // Cherche par clé
                ['value' => $value]  // Met à jour ou crée la valeur
            );
        }

        return response()->json(['message' => 'Paramètres mis à jour avec succès']);
    }
}