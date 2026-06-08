<?php

// ============================================
// MODEL: User
// ============================================
// Représente un administrateur du site
// Utilise Laravel Sanctum pour l'authentification
// par token API

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

// Champs autorisés pour le remplissage en masse
#[Fillable(['name', 'email', 'password'])]

// Champs cachés dans les réponses JSON (sécurité)
#[Hidden(['password', 'remember_token'])]

class User extends Authenticatable
{
    // HasApiTokens: permet la génération de tokens Sanctum
    // HasFactory: permet la création de faux utilisateurs en test
    // Notifiable: permet l'envoi de notifications
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Conversion automatique des types
     * - email_verified_at: string -> Carbon (date)
     * - password: hashage automatique à l'assignation
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }
}