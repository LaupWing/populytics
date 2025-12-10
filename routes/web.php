<?php

use App\Http\Requests\CheckoutRequest;
use App\Mail\OrderConfirmation;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\Mail;
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

Route::get('/products/{product}', function (Product $product) {
    return Inertia::render('products/show', [
        'product' => $product,
    ]);
})->name('products.show');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::post('/checkout', function (CheckoutRequest $request) {
        $items = $request->validated()['items'];

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

        // Load relationships and send confirmation email
        $order->load(['products', 'user']);
        Mail::to(auth()->user())->send(new OrderConfirmation($order));

        return Inertia::render('checkout', [
            'order' => $order,
        ]);
    })->name('checkout');

    Route::get('/profile', function () {
        $orders = auth()->user()->orders()->with('products')->latest()->get();
        return Inertia::render('profile', [
            'orders' => $orders,
        ]);
    })->name('profile');

    Route::get('/orders/{order}', function (Order $order) {
        // Use policy to check authorization
        if (auth()->user()->cannot('view', $order)) {
            return Inertia::render('errors/unauthorized-order');
        }

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
