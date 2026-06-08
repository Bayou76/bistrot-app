<?php

// ============================================
// AUTH CONTROLLER
// ============================================
// Gère l'authentification des administrateurs
// POST /api/login  -> login()  (public)
// POST /api/logout -> logout() (protégé par Sanctum)

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Connexion admin
     * Vérifie email + password et retourne un token Sanctum
     *
     * @param Request $request {email, password}
     * @return JsonResponse {token, user} ou 401
     */
    public function login(Request $request)
    {
        // Validation des champs obligatoires
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        // Tentative de connexion avec les credentials
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Email ou mot de passe incorrect'
            ], 401);
        }

        // Génération du token Sanctum pour l'admin connecté
        $user  = Auth::user();
        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => $user,
        ]);
    }

    /**
     * Déconnexion admin
     * Révoque le token actuel pour invalider la session
     *
     * @param Request $request
     * @return JsonResponse {message}
     */
    public function logout(Request $request)
    {
        // Suppression du token courant uniquement
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnecté avec succès'
        ]);
    }
}