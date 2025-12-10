<?php

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
});

require __DIR__.'/settings.php';
