<?php

// ============================================
// MODEL: Setting
// ============================================
// Représente un paramètre du site en base de données
// Table: settings
// Stockage clé/valeur pour les infos du bistrot:
// - Promo (texte + activation)
// - Horaires d'ouverture
// - Adresse et téléphone
// - Textes de la page d'accueil

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    /**
     * Champs autorisés pour le remplissage en masse
     * key   = identifiant unique du paramètre (ex: "phone")
     * value = valeur du paramètre (ex: "02 78 81 80 83")
     */
    protected $fillable = [
        'key',   // Clé unique du paramètre
        'value', // Valeur associée
    ];
}