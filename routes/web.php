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
        return Inertia::render('checkout');
    })->name('checkout');

    Route::get('/profile', function () {
        $orders = auth()->user()->orders()->with('products')->latest()->get();
        return Inertia::render('profile', [
            'orders' => $orders,
        ]);
    })->name('profile');

    Route::get('/orders/{order}', function (Order $order) {
        // Ensure user can only view their own orders
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $order->load(['products', 'user']);
        return Inertia::render('orders/show', [
            'order' => $order,
        ]);
    })->name('orders.show');
});

require __DIR__.'/settings.php';
