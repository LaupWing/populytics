<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CheckoutRequestTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Product $product;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->product = Product::create([
            'title' => 'Test Product',
            'price' => 49.00,
        ]);
    }

    public function test_checkout_fails_with_empty_items(): void
    {
        $response = $this->actingAs($this->user)
            ->postJson('/checkout', ['items' => []]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['items']);
    }

    public function test_checkout_fails_without_items(): void
    {
        $response = $this->actingAs($this->user)
            ->postJson('/checkout', []);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['items']);
    }

    public function test_checkout_fails_when_quantity_is_zero(): void
    {
        $response = $this->actingAs($this->user)
            ->postJson('/checkout', [
                'items' => [
                    [
                        'id' => $this->product->id,
                        'quantity' => 0,
                        'price' => 49.00,
                    ],
                ],
            ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['items.0.quantity']);
        $response->assertJsonFragment([
            'items.0.quantity' => ['Quantity must be greater than 0.'],
        ]);
    }

    public function test_checkout_fails_when_quantity_is_negative(): void
    {
        $response = $this->actingAs($this->user)
            ->postJson('/checkout', [
                'items' => [
                    [
                        'id' => $this->product->id,
                        'quantity' => -1,
                        'price' => 49.00,
                    ],
                ],
            ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['items.0.quantity']);
    }

    public function test_checkout_fails_when_price_is_zero(): void
    {
        $response = $this->actingAs($this->user)
            ->postJson('/checkout', [
                'items' => [
                    [
                        'id' => $this->product->id,
                        'quantity' => 1,
                        'price' => 0,
                    ],
                ],
            ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['items.0.price']);
        $response->assertJsonFragment([
            'items.0.price' => ['Price per unit must be greater than 0.'],
        ]);
    }

    public function test_checkout_fails_when_price_is_negative(): void
    {
        $response = $this->actingAs($this->user)
            ->postJson('/checkout', [
                'items' => [
                    [
                        'id' => $this->product->id,
                        'quantity' => 1,
                        'price' => -10.00,
                    ],
                ],
            ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['items.0.price']);
    }

    public function test_checkout_fails_when_product_does_not_exist(): void
    {
        $response = $this->actingAs($this->user)
            ->postJson('/checkout', [
                'items' => [
                    [
                        'id' => 9999,
                        'quantity' => 1,
                        'price' => 49.00,
                    ],
                ],
            ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['items.0.id']);
        $response->assertJsonFragment([
            'items.0.id' => ['One or more products in your cart no longer exist.'],
        ]);
    }

    public function test_checkout_fails_when_quantity_is_not_integer(): void
    {
        $response = $this->actingAs($this->user)
            ->postJson('/checkout', [
                'items' => [
                    [
                        'id' => $this->product->id,
                        'quantity' => 1.5,
                        'price' => 49.00,
                    ],
                ],
            ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['items.0.quantity']);
    }

    public function test_checkout_fails_when_required_fields_missing(): void
    {
        $response = $this->actingAs($this->user)
            ->postJson('/checkout', [
                'items' => [
                    [
                        'id' => $this->product->id,
                        // missing quantity and price
                    ],
                ],
            ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'items.0.quantity',
            'items.0.price',
        ]);
    }

    public function test_checkout_succeeds_with_valid_data(): void
    {
        $response = $this->actingAs($this->user)
            ->post('/checkout', [
                'items' => [
                    [
                        'id' => $this->product->id,
                        'quantity' => 2,
                        'price' => 49.00,
                    ],
                ],
            ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('orders', [
            'user_id' => $this->user->id,
        ]);
        $this->assertDatabaseHas('order_products', [
            'product_id' => $this->product->id,
            'quantity' => 2,
            'price_at_purchase' => 49.00,
        ]);
    }

    public function test_checkout_calculates_shipping_for_orders_under_50(): void
    {
        $response = $this->actingAs($this->user)
            ->post('/checkout', [
                'items' => [
                    [
                        'id' => $this->product->id,
                        'quantity' => 1,
                        'price' => 49.00,
                    ],
                ],
            ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('orders', [
            'user_id' => $this->user->id,
            'total_price' => 53.95, // 49 + 4.95 shipping
        ]);
    }

    public function test_checkout_free_shipping_for_orders_50_or_above(): void
    {
        $response = $this->actingAs($this->user)
            ->post('/checkout', [
                'items' => [
                    [
                        'id' => $this->product->id,
                        'quantity' => 2,
                        'price' => 49.00,
                    ],
                ],
            ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('orders', [
            'user_id' => $this->user->id,
            'total_price' => 98.00, // No shipping added
        ]);
    }

    public function test_guest_cannot_checkout(): void
    {
        $response = $this->postJson('/checkout', [
            'items' => [
                [
                    'id' => $this->product->id,
                    'quantity' => 1,
                    'price' => 49.00,
                ],
            ],
        ]);

        $response->assertStatus(401);
    }
}
