<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SettingController;

Route::get('/menu', [MenuItemController::class, 'index']);
Route::get('/menu/{id}', [MenuItemController::class, 'show']);
Route::get('/settings', [SettingController::class, 'index']);

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::prefix('admin')->group(function () {
        Route::post('/menu', [MenuItemController::class, 'store']);
        Route::put('/menu/{id}', [MenuItemController::class, 'update']);
        Route::delete('/menu/{id}', [MenuItemController::class, 'destroy']);
        Route::post('/settings', [SettingController::class, 'update']);
    });
});