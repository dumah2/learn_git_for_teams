<?php

namespace App\Http\Controllers\V1;

use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Exception;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validate credentials
        $credentials = $request->validate([
            "email" => ["required", "email"],
            "password" => ["required"]
        ]);

        // Throw error if invalid creadentials
        if (!Auth::attempt($credentials)) {
            return response()->json(["message" => "Invalid credentials"], 401);
        }

        // Create access token
        $user = Auth::user();

        $token = $user->createToken("ACCESS_TOKEN", ["post:create"])->plainTextToken;

        return response()->json(["user" => $user, "token" => $token]);
    }

    public function logout(Request $request)
    {
        try {
            /** @var PersonalAccessToken $token */
            $token = $request->user()->currentAccessToken();
            $token->delete();
        } catch (Exception $e) {
            return response()->json(["message" => "Error while loging out"]);
        }
        return response()->json(["message" => "User logged out"]);
    }
}
