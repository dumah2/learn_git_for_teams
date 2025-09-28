<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Faker\Factory as Faker;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = Faker::create();

        $userId = User::inRandomOrder()->first()->id;
        $title = $faker->title();
        $slug = Str::slug($title);
        $body = implode("\n\n", $faker->paragraphs());
        $isPublished = $faker->boolean();

        return [
            "userId" => $userId,
            "title" => $title,
            "body" => $body,
            "slug" => $slug,
            "isPublished" => $isPublished,
            "created_at" => now()->toDateTime(),
            "updated_at" => now()->toDateTime()
        ];
    }
}
