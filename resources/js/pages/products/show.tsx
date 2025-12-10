import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, ShoppingCart, User, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/stores/cart-store';
import { Toaster, toast } from 'sonner';
import { type SharedData } from '@/types';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image_url: string;
}

interface ProductShowProps {
    product: Product;
}

export default function ProductShow({ product }: ProductShowProps) {
    const { auth } = usePage<SharedData>().props;
    const { addItem } = useCartStore();
    const items = useCartStore((state) => state.items);
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    const itemInCart = items.find((item) => item.id === product.id);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            image_url: product.image_url,
        });

        toast.success(`${product.title} toegevoegd aan winkelwagen`, {
            description: `€${product.price.toFixed(2)}`,
            style: {
                background: '#004876',
                color: 'white',
                border: 'none',
            },
        });
    };

    return (
        <>
            <Head title={`${product.title} - Populytics`}>
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

            <Toaster position="bottom-right" richColors />

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

                    <nav className="flex items-center gap-4">
                        <Link href="/cart">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative"
                                style={{ color: '#004876' }}
                            >
                                <ShoppingCart className="h-5 w-5" />
                                <Badge
                                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                                    style={{
                                        background: '#00A6D6',
                                        color: 'white',
                                        border: 'none',
                                    }}
                                >
                                    {totalItems}
                                </Badge>
                            </Button>
                        </Link>

                        {auth.user && (
                            <Link href="/profile">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full"
                                    style={{
                                        background: 'linear-gradient(135deg, #00A6D6 0%, #004876 100%)',
                                        color: 'white',
                                    }}
                                >
                                    <User className="h-5 w-5" />
                                </Button>
                            </Link>
                        )}
                    </nav>
                </header>

                {/* Breadcrumb */}
                <div className="px-6 py-4">
                    <div className="max-w-6xl mx-auto">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                            style={{ color: '#004876' }}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Terug naar producten
                        </Link>
                    </div>
                </div>

                {/* Product Content */}
                <main className="px-6 py-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Product Image */}
                            <div
                                className="rounded-2xl overflow-hidden"
                                style={{
                                    boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <img
                                    src={product.image_url}
                                    alt={product.title}
                                    className="w-full h-full object-cover aspect-square"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex flex-col">
                                <h1
                                    className="text-4xl mb-4"
                                    style={{
                                        fontFamily: '"NexaText-Bold", sans-serif',
                                        color: '#004876',
                                    }}
                                >
                                    {product.title}
                                </h1>

                                <p
                                    className="text-4xl mb-6"
                                    style={{
                                        fontFamily: '"NexaText-Heavy", sans-serif',
                                        color: '#00A6D6',
                                    }}
                                >
                                    €{product.price.toFixed(2)}
                                </p>

                                <p
                                    className="text-lg mb-8 leading-relaxed"
                                    style={{ color: '#004876', opacity: 0.8 }}
                                >
                                    {product.description}
                                </p>

                                {/* Add to Cart */}
                                <div className="flex items-center gap-4 mb-8">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 py-4 px-8 rounded-lg transition-all hover:opacity-90 flex items-center justify-center gap-2"
                                        style={{
                                            fontFamily: '"NexaText-Bold", sans-serif',
                                            background: '#004876',
                                            color: 'white',
                                        }}
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        Toevoegen aan winkelwagen
                                    </button>
                                </div>

                                {itemInCart && (
                                    <div
                                        className="flex items-center gap-2 p-4 rounded-lg"
                                        style={{ background: '#d4edda', color: '#155724' }}
                                    >
                                        <Check className="w-5 h-5" />
                                        <span style={{ fontFamily: '"NexaText-Bold", sans-serif' }}>
                                            {itemInCart.quantity}x in je winkelwagen
                                        </span>
                                    </div>
                                )}

                                {/* Product Details */}
                                <div
                                    className="mt-auto p-6 rounded-lg"
                                    style={{
                                        background: 'white',
                                        boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <h3
                                        className="text-lg mb-4"
                                        style={{
                                            fontFamily: '"NexaText-Bold", sans-serif',
                                            color: '#004876',
                                        }}
                                    >
                                        Productinformatie
                                    </h3>
                                    <ul className="space-y-2 text-sm" style={{ color: '#004876' }}>
                                        <li className="flex justify-between">
                                            <span style={{ opacity: 0.7 }}>Verzending</span>
                                            <span>Gratis vanaf €50</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span style={{ opacity: 0.7 }}>Levertijd</span>
                                            <span>2-4 werkdagen</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span style={{ opacity: 0.7 }}>Retour</span>
                                            <span>14 dagen bedenktijd</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer
                    className="px-6 py-8 mt-12"
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
