import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle, Package, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { type SharedData } from '@/types';
import { useCartStore } from '@/stores/cart-store';
import { useEffect } from 'react';

export default function Checkout() {
    const { auth } = usePage<SharedData>().props;
    const { clearCart } = useCartStore();

    // Clear cart after successful checkout
    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <>
            <Head title="Bestelling geplaatst - Populytics">
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
                    @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                    @keyframes pulse-ring {
                        0% { transform: scale(0.8); opacity: 1; }
                        100% { transform: scale(1.4); opacity: 0; }
                    }
                `}</style>
            </Head>

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
                </header>

                {/* Success Content */}
                <main className="px-6 py-16">
                    <div className="max-w-2xl mx-auto text-center">
                        {/* Animated Success Icon */}
                        <div className="relative inline-block mb-8">
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: '#00A6D6',
                                    animation: 'pulse-ring 2s ease-out infinite',
                                }}
                            />
                            <div
                                className="relative w-24 h-24 rounded-full flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, #00A6D6 0%, #004876 100%)',
                                    animation: 'float 3s ease-in-out infinite',
                                }}
                            >
                                <CheckCircle className="w-12 h-12 text-white" />
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5" style={{ color: '#00A6D6' }} />
                            <span
                                className="text-sm uppercase tracking-wider"
                                style={{ color: '#00A6D6' }}
                            >
                                Bestelling succesvol
                            </span>
                            <Sparkles className="w-5 h-5" style={{ color: '#00A6D6' }} />
                        </div>

                        <h1
                            className="text-4xl mb-4"
                            style={{
                                fontFamily: '"NexaText-Bold", sans-serif',
                                color: '#004876',
                            }}
                        >
                            Bedankt voor je bestelling!
                        </h1>

                        <p
                            className="text-lg mb-8 max-w-md mx-auto"
                            style={{ color: '#004876', opacity: 0.8, lineHeight: 1.7 }}
                        >
                            Hoi {auth.user?.name?.split(' ')[0] || 'daar'}! Je bestelling is ontvangen en wordt verwerkt.
                            Je ontvangt een bevestigingsmail op <strong>{auth.user?.email}</strong>.
                        </p>

                        {/* Order Info Card */}
                        <div
                            className="p-6 rounded-lg mb-8 text-left"
                            style={{
                                background: 'white',
                                boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center"
                                    style={{ background: '#e9f3f8' }}
                                >
                                    <Package className="w-5 h-5" style={{ color: '#004876' }} />
                                </div>
                                <div>
                                    <p
                                        className="text-sm"
                                        style={{ color: '#004876', opacity: 0.7 }}
                                    >
                                        Verwachte levering
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: '"NexaText-Bold", sans-serif',
                                            color: '#004876',
                                        }}
                                    >
                                        2-4 werkdagen
                                    </p>
                                </div>
                            </div>

                            <div
                                className="pt-4"
                                style={{ borderTop: '1px solid #e9f3f8' }}
                            >
                                <p className="text-sm" style={{ color: '#004876', opacity: 0.7 }}>
                                    Je kunt je bestellingen altijd bekijken in je profiel.
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/profile"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded transition-all hover:opacity-90"
                                style={{
                                    fontFamily: '"NexaText-Bold", sans-serif',
                                    background: '#004876',
                                    color: 'white',
                                }}
                            >
                                <Package className="w-5 h-5" />
                                Bekijk bestellingen
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded transition-all hover:opacity-90"
                                style={{
                                    fontFamily: '"NexaText-Bold", sans-serif',
                                    background: 'transparent',
                                    color: '#004876',
                                    border: '2px solid #004876',
                                }}
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Verder winkelen
                            </Link>
                        </div>
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
