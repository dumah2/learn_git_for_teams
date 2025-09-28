<?php

namespace App\Http\Controllers\V1;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate user data
        $data = $request->validate([
            "name" => ["required", "max:60"],
            "email" => ["required", "email", "max:230", "unique:users,email"],
            "password" => ["required", "max:60"]
        ]);

        // Get password hash
        $passHash = Hash::make($data["password"]);
        // Save user
        User::create([
            "name" => $data["name"],
            "email" => $data["email"],
            "password" => $passHash
        ]);

        return response()->json(["message" => "User created successfully"], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json(["user" => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
