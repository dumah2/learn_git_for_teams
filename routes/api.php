<?php

use App\Http\Controllers\V1\AuthController;
use App\Http\Controllers\V1\PostController;
use App\Http\Controllers\V1\UserController;
use App\Models\User;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Version 1
Route::prefix("/v1")->group(function () {
    Route::get("/users/{user}", [UserController::class, "show"]);
    Route::apiResource("/posts", PostController::class);

    // Auth routes
    Route::prefix("auth")->group(function () {
        Route::post("login", [AuthController::class, "login"]);
        Route::post("logout", [AuthController::class, "logout"]);
    })->middleware("auth:sanctum");
})->middleware(Authenticate::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
