<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Post::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $query = Post::query();

        if ($request->has("user")) {
            $query = $query->where("userId", $request->user);
        }

        if ($request->has("range_init") && $request->has("range_end")) {
            $query->whereBetween("created_at", [$request->range_init, $request->range_end]);
        }

        return $query->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {

        if ($post) {

            $post->title = $request->has("title") ? $request->title : $post->title;

            $post->save();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
