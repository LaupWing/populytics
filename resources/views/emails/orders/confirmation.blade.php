<x-mail::message>
# Bedankt voor je bestelling!

Hoi {{ $user->name }},

Bedankt voor je bestelling bij Populytics. We hebben je bestelling ontvangen en gaan er direct mee aan de slag.

---

## Bestelling #{{ $order->id }}

**Datum:** {{ $order->created_at->format('d-m-Y H:i') }}

**Status:** {{ $order->status === 'processing' ? 'In behandeling' : 'Geaccepteerd' }}

---

## Producten

<x-mail::table>
| Product | Aantal | Prijs |
|:--------|:------:|------:|
@foreach($products as $product)
| {{ $product->title }} | {{ $product->pivot->quantity }}x | €{{ number_format($product->pivot->price_at_purchase * $product->pivot->quantity, 2, ',', '.') }} |
@endforeach
</x-mail::table>

---

@php
    $subtotal = $products->sum(fn($p) => $p->pivot->quantity * $p->pivot->price_at_purchase);
    $shipping = $subtotal >= 50 ? 0 : 4.95;
@endphp

**Subtotaal:** €{{ number_format($subtotal, 2, ',', '.') }}

**Verzendkosten:** {{ $shipping === 0 ? 'Gratis' : '€' . number_format($shipping, 2, ',', '.') }}

**Totaal:** €{{ number_format($order->total_price, 2, ',', '.') }}

---

## Levering

Je bestelling wordt binnen **2-4 werkdagen** bezorgd.

<x-mail::button :url="config('app.url') . '/orders/' . $order->id">
Bekijk je bestelling
</x-mail::button>

Heb je vragen over je bestelling? Neem gerust contact met ons op via info@populytics.nl.

Met vriendelijke groet,<br>
Het Populytics Team

<x-mail::subcopy>
Populytics B.V.<br>
Strawinskylaan 339, 1077 XX Amsterdam
</x-mail::subcopy>
</x-mail::message>
