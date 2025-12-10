<?php

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'products' => Product::all(),
    ]);
})->name('home');

Route::get('/cart', function () {
    return Inertia::render('cart');
})->name('cart');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::post('/checkout', function () {
        $items = request()->input('items', []);

        if (empty($items)) {
            return redirect()->route('cart');
        }

        // Calculate total price
        $totalPrice = 0;
        foreach ($items as $item) {
            $totalPrice += $item['price'] * $item['quantity'];
        }

        // Add shipping if under €50
        if ($totalPrice < 50) {
            $totalPrice += 4.95;
        }

        // Create the order
        $order = Order::create([
            'user_id' => auth()->id(),
            'total_price' => $totalPrice,
            'status' => 'processing',
        ]);

        // Attach products to order
        foreach ($items as $item) {
            $order->products()->attach($item['id'], [
                'quantity' => $item['quantity'],
                'price_at_purchase' => $item['price'],
            ]);
        }

        return Inertia::render('checkout', [
            'order' => $order->load('products'),
        ]);
    })->name('checkout');

    Route::get('/profile', function () {
        $orders = auth()->user()->orders()->with('products')->latest()->get();
        return Inertia::render('profile', [
            'orders' => $orders,
        ]);
    })->name('profile');

    Route::get('/orders/{order}', function (Order $order) {
        $order->load(['products', 'user']);
        return Inertia::render('orders/show', [
            'order' => $order,
        ]);
    })->name('orders.show');

    // Admin orders page
    Route::get('/admin/orders', function () {
        $orders = Order::with(['products', 'user'])->latest()->get();
        return Inertia::render('admin/orders', [
            'orders' => $orders,
        ]);
    })->name('admin.orders');

    // Update order status
    Route::patch('/admin/orders/{order}/status', function (Order $order) {
        $order->update([
            'status' => request()->input('status'),
        ]);

        return back();
    })->name('admin.orders.update-status');
});

require __DIR__.'/settings.php';
