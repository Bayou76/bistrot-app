<?php

// ============================================
// MENU ITEM CONTROLLER
// ============================================
// Gère toutes les opérations CRUD sur les plats
// GET /api/menu              -> index()   (public)
// GET /api/menu/{id}         -> show()    (public)
// POST /api/admin/menu       -> store()   (admin)
// PUT /api/admin/menu/{id}   -> update()  (admin)
// DELETE /api/admin/menu/{id}-> destroy() (admin)

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuItemController extends Controller
{
    /**
     * Récupère tous les plats groupés par catégorie
     */
    public function index()
    {
        $items = MenuItem::all()->groupBy('category');
        return response()->json($items);
    }

    /**
     * Récupère un plat spécifique par son ID
     */
    public function show($id)
    {
        $item = MenuItem::findOrFail($id);
        return response()->json($item);
    }

    /**
     * Crée un nouveau plat (admin uniquement)
     */
    public function store(Request $request)
    {
        $item = MenuItem::create($request->all());
        return response()->json($item, 201);
    }

    /**
     * Met à jour un plat existant (admin uniquement)
     */
    public function update(Request $request, $id)
    {
        $item = MenuItem::findOrFail($id);
        $item->update($request->all());
        return response()->json($item);
    }

    /**
     * Supprime un plat (admin uniquement)
     */
    public function destroy($id)
    {
        MenuItem::findOrFail($id)->delete();
        return response()->json(['message' => 'Plat supprimé avec succès']);
    }
}