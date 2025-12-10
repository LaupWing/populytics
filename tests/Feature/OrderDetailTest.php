<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderDetailTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_their_own_order(): void
    {
        $user = User::factory()->create();
        $product = Product::create([
            'title' => 'Test Product',
            'price' => 49.00,
        ]);

        $order = Order::create([
            'user_id' => $user->id,
            'total_price' => 49.00,
            'status' => 'processing',
        ]);

        $order->products()->attach($product->id, [
            'quantity' => 1,
            'price_at_purchase' => 49.00,
        ]);

        $response = $this->actingAs($user)->get("/orders/{$order->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('orders/show')
            ->has('order')
            ->where('order.id', $order->id)
        );
    }

    public function test_user_cannot_view_another_users_order(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();

        $order = Order::create([
            'user_id' => $owner->id,
            'total_price' => 49.00,
            'status' => 'processing',
        ]);

        $response = $this->actingAs($otherUser)->get("/orders/{$order->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('errors/unauthorized-order')
        );
    }

    public function test_guest_cannot_view_order(): void
    {
        $user = User::factory()->create();

        $order = Order::create([
            'user_id' => $user->id,
            'total_price' => 49.00,
            'status' => 'processing',
        ]);

        $response = $this->get("/orders/{$order->id}");

        $response->assertRedirect('/login');
    }

    public function test_order_detail_shows_products(): void
    {
        $user = User::factory()->create();
        $product1 = Product::create([
            'title' => 'Product One',
            'price' => 49.00,
        ]);
        $product2 = Product::create([
            'title' => 'Product Two',
            'price' => 89.00,
        ]);

        $order = Order::create([
            'user_id' => $user->id,
            'total_price' => 138.00,
            'status' => 'processing',
        ]);

        $order->products()->attach($product1->id, [
            'quantity' => 1,
            'price_at_purchase' => 49.00,
        ]);
        $order->products()->attach($product2->id, [
            'quantity' => 1,
            'price_at_purchase' => 89.00,
        ]);

        $response = $this->actingAs($user)->get("/orders/{$order->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('orders/show')
            ->has('order.products', 2)
        );
    }
}
