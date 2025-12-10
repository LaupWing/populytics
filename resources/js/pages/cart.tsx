import { Head, Link, useForm } from '@inertiajs/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore, type CartItem } from '@/stores/cart-store';
import { Toaster, toast } from 'sonner';

export default function Cart() {
    const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();

    const { post, processing } = useForm({
        items: items as CartItem[],
    });

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        post('/checkout', {
            data: { items },
        });
    };

    const handleRemoveItem = (id: number, title: string) => {
        removeItem(id);
        toast.success(`${title} verwijderd uit winkelwagen`, {
            style: {
                background: '#004876',
                color: 'white',
                border: 'none',
            },
        });
    };

    const handleClearCart = () => {
        clearCart();
        toast.success('Winkelwagen geleegd', {
            style: {
                background: '#004876',
                color: 'white',
                border: 'none',
            },
        });
    };

    return (
        <>
            <Head title="Winkelwagen - Populytics">
                <style>{`
                    @font-face {
                        font-family: "NexaText-Bold";
                        src: url("https://populytics.nl/wp-content/themes/populytics/assets/fonts/NexaText/NexaText-Bold.woff2") format("woff2");
                        font-weight: normal;
                        font-style: normal;
                    }
                    @font-face {
                        font-family: "NexaText-Book";
                        src: url("https://populytics.nl/wp-content/themes/populytics/assets/fonts/NexaText/NexaText-Book.woff2") format("woff2");
                        font-weight: normal;
                        font-style: normal;
                    }
                    @font-face {
                        font-family: "NexaText-Heavy";
                        src: url("https://populytics.nl/wp-content/themes/populytics/assets/fonts/NexaText/NexaText-Heavy.woff2") format("woff2");
                        font-weight: normal;
                        font-style: normal;
                    }
                `}</style>
            </Head>

            <Toaster position="top-right" richColors />

            <div
                className="min-h-screen"
                style={{
                    fontFamily: '"NexaText-Book", sans-serif',
                    color: '#004876',
                    background: 'linear-gradient(0deg, #e9f3f8 0%, white 100%)',
                }}
            >
                {/* Header */}
                <header
                    className="w-full px-6 py-5 flex justify-between items-center"
                    style={{ borderBottom: '2px solid #e9f3f8' }}
                >
                    <Link href="/" className="flex items-center gap-3">
                        <svg
                            viewBox="0 0 100 100"
                            className="w-10 h-10"
                            style={{ fill: '#0066A2' }}
                        >
                            <circle cx="50" cy="50" r="45" />
                            <circle cx="50" cy="50" r="30" fill="white" />
                            <circle cx="50" cy="50" r="15" style={{ fill: '#00A6D6' }} />
                        </svg>
                        <span
                            className="text-xl"
                            style={{
                                fontFamily: '"NexaText-Bold", sans-serif',
                                color: '#004876',
                            }}
                        >
                            Populytics Shop
                        </span>
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 rounded transition-all hover:opacity-80"
                        style={{ color: '#004876' }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Verder winkelen
                    </Link>
                </header>

                {/* Cart Content */}
                <main className="px-6 py-12">
                    <div className="max-w-4xl mx-auto">
                        <h1
                            className="text-3xl mb-8"
                            style={{
                                fontFamily: '"NexaText-Bold", sans-serif',
                                color: '#004876',
                            }}
                        >
                            Winkelwagen
                        </h1>

                        {items.length === 0 ? (
                            <div
                                className="text-center py-16 rounded-lg"
                                style={{ background: 'white', boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)' }}
                            >
                                <ShoppingBag
                                    className="w-16 h-16 mx-auto mb-4"
                                    style={{ color: '#00A6D6' }}
                                />
                                <h2
                                    className="text-xl mb-2"
                                    style={{
                                        fontFamily: '"NexaText-Bold", sans-serif',
                                        color: '#004876',
                                    }}
                                >
                                    Je winkelwagen is leeg
                                </h2>
                                <p className="mb-6" style={{ color: '#004876', opacity: 0.7 }}>
                                    Ontdek onze educatieve materialen en voeg ze toe aan je winkelwagen.
                                </p>
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded transition-all hover:opacity-90"
                                    style={{
                                        fontFamily: '"NexaText-Bold", sans-serif',
                                        background: '#004876',
                                        color: 'white',
                                    }}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Bekijk producten
                                </Link>
                            </div>
                        ) : (
                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Cart Items */}
                                <div className="lg:col-span-2 space-y-4">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-4 p-4 rounded-lg"
                                            style={{
                                                background: 'white',
                                                boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
                                            }}
                                        >
                                            {/* Product Image */}
                                            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.image_url}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3
                                                    className="text-lg mb-1 truncate"
                                                    style={{
                                                        fontFamily: '"NexaText-Bold", sans-serif',
                                                        color: '#004876',
                                                    }}
                                                >
                                                    {item.title}
                                                </h3>
                                                <p
                                                    className="text-lg mb-3"
                                                    style={{
                                                        fontFamily: '"NexaText-Heavy", sans-serif',
                                                        color: '#00A6D6',
                                                    }}
                                                >
                                                    €{item.price.toFixed(2)}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                                                        style={{
                                                            background: '#e9f3f8',
                                                            color: '#004876',
                                                            border: '1px solid #004876',
                                                        }}
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span
                                                        className="text-lg min-w-[2rem] text-center"
                                                        style={{
                                                            fontFamily: '"NexaText-Bold", sans-serif',
                                                            color: '#004876',
                                                        }}
                                                    >
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                                                        style={{
                                                            background: '#e9f3f8',
                                                            color: '#004876',
                                                            border: '1px solid #004876',
                                                        }}
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Subtotal & Remove */}
                                            <div className="flex flex-col items-end justify-between">
                                                <button
                                                    onClick={() => handleRemoveItem(item.id, item.title)}
                                                    className="p-2 rounded-full transition-all hover:bg-red-50"
                                                    style={{ color: '#dc2626' }}
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                                <span
                                                    className="text-lg"
                                                    style={{
                                                        fontFamily: '"NexaText-Heavy", sans-serif',
                                                        color: '#004876',
                                                    }}
                                                >
                                                    €{(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Clear Cart Button */}
                                    <button
                                        onClick={handleClearCart}
                                        className="flex items-center gap-2 px-4 py-2 rounded transition-all hover:opacity-80"
                                        style={{
                                            color: '#dc2626',
                                            background: 'transparent',
                                            border: '1px solid #dc2626',
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Winkelwagen legen
                                    </button>
                                </div>

                                {/* Order Summary */}
                                <div className="lg:col-span-1">
                                    <div
                                        className="p-6 rounded-lg sticky top-6"
                                        style={{
                                            background: 'white',
                                            boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <h2
                                            className="text-xl mb-6"
                                            style={{
                                                fontFamily: '"NexaText-Bold", sans-serif',
                                                color: '#004876',
                                            }}
                                        >
                                            Overzicht
                                        </h2>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex justify-between">
                                                <span style={{ color: '#004876', opacity: 0.7 }}>Subtotaal</span>
                                                <span style={{ color: '#004876' }}>€{getTotalPrice().toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ color: '#004876', opacity: 0.7 }}>Verzendkosten</span>
                                                <span style={{ color: getTotalPrice() >= 50 ? '#00A6D6' : '#004876' }}>
                                                    {getTotalPrice() >= 50 ? 'Gratis' : '€4.95'}
                                                </span>
                                            </div>
                                            {getTotalPrice() < 50 && (
                                                <p className="text-sm" style={{ color: '#00A6D6' }}>
                                                    Nog €{(50 - getTotalPrice()).toFixed(2)} voor gratis verzending
                                                </p>
                                            )}
                                        </div>

                                        <div
                                            className="flex justify-between py-4 mb-6"
                                            style={{ borderTop: '2px solid #e9f3f8' }}
                                        >
                                            <span
                                                style={{
                                                    fontFamily: '"NexaText-Bold", sans-serif',
                                                    color: '#004876',
                                                }}
                                            >
                                                Totaal
                                            </span>
                                            <span
                                                className="text-xl"
                                                style={{
                                                    fontFamily: '"NexaText-Heavy", sans-serif',
                                                    color: '#00A6D6',
                                                }}
                                            >
                                                €{(getTotalPrice() + (getTotalPrice() >= 50 ? 0 : 4.95)).toFixed(2)}
                                            </span>
                                        </div>

                                        <form onSubmit={handleCheckout}>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full py-3 rounded transition-all hover:opacity-90 disabled:opacity-50"
                                                style={{
                                                    fontFamily: '"NexaText-Bold", sans-serif',
                                                    background: '#004876',
                                                    color: 'white',
                                                }}
                                            >
                                                {processing ? 'Laden...' : 'Afrekenen'}
                                            </button>
                                        </form>

                                        <p
                                            className="text-center text-sm mt-4"
                                            style={{ color: '#004876', opacity: 0.7 }}
                                        >
                                            Veilig betalen met iDEAL, creditcard of PayPal
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                {/* Footer */}
                <footer
                    className="px-6 py-8 mt-auto"
                    style={{
                        borderTop: '0.3rem solid #0066A2',
                        background: 'white',
                    }}
                >
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <svg
                                viewBox="0 0 100 100"
                                className="w-8 h-8"
                                style={{ fill: '#0066A2' }}
                            >
                                <circle cx="50" cy="50" r="45" />
                                <circle cx="50" cy="50" r="30" fill="white" />
                                <circle cx="50" cy="50" r="15" style={{ fill: '#00A6D6' }} />
                            </svg>
                            <span
                                style={{
                                    fontFamily: '"NexaText-Bold", sans-serif',
                                    color: '#004876',
                                }}
                            >
                                Populytics
                            </span>
                        </div>

                        <div className="text-sm" style={{ color: '#004876', opacity: 0.7 }}>
                            Strawinskylaan 339, 1077 XX Amsterdam
                        </div>

                        <div className="text-sm" style={{ color: '#004876', opacity: 0.7 }}>
                            info@populytics.nl
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
