<?php

// ============================================
// ROUTES API
// ============================================
// Définit toutes les routes de l'API REST
// Routes publiques: accessibles sans authentification
// Routes protégées: nécessitent un token Sanctum (admin)

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SettingController;

// ==========================================
// ROUTES PUBLIQUES
// Accessibles par tous (frontend client)
// ==========================================

// Récupère tous les plats groupés par catégorie
Route::get('/menu', [MenuItemController::class, 'index']);

// Récupère un plat spécifique par son ID
Route::get('/menu/{id}', [MenuItemController::class, 'show']);

// Récupère tous les paramètres du site (horaires, contact, etc.)
Route::get('/settings', [SettingController::class, 'index']);

// Connexion admin - retourne un token JWT Sanctum
Route::post('/login', [AuthController::class, 'login']);

// ==========================================
// ROUTES PROTÉGÉES (Admin uniquement)
// Nécessitent: Authorization: Bearer {token}
// ==========================================
Route::middleware('auth:sanctum')->group(function () {

    // Déconnexion - révoque le token actuel
    Route::post('/logout', [AuthController::class, 'logout']);

    // Groupe des routes admin
    Route::prefix('admin')->group(function () {

        // ---- GESTION DU MENU ----
        // Ajouter un nouveau plat
        Route::post('/menu', [MenuItemController::class, 'store']);

        // Modifier un plat existant
        Route::put('/menu/{id}', [MenuItemController::class, 'update']);

        // Supprimer un plat
        Route::delete('/menu/{id}', [MenuItemController::class, 'destroy']);

        // ---- GESTION DES PARAMÈTRES ----
        // Mettre à jour les paramètres du site
        Route::post('/settings', [SettingController::class, 'update']);
    });
});