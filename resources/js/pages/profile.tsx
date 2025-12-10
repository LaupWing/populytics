import { Head, Link, usePage } from '@inertiajs/react';
import { User, Package, ShoppingBag, ArrowLeft, Clock, CheckCircle, Loader2, ChevronRight } from 'lucide-react';
import { type SharedData } from '@/types';

interface OrderProduct {
    id: number;
    title: string;
    image_url: string;
    pivot: {
        quantity: number;
        price_at_purchase: number;
    };
}

interface Order {
    id: number;
    total_price: number;
    status: 'processing' | 'accepted';
    created_at: string;
    products: OrderProduct[];
}

interface ProfileProps {
    orders: Order[];
}

export default function Profile({ orders = [] }: ProfileProps) {
    const { auth } = usePage<SharedData>().props;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('nl-NL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const getStatusBadge = (status: 'processing' | 'accepted') => {
        if (status === 'accepted') {
            return (
                <span
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                    style={{ background: '#d4edda', color: '#155724' }}
                >
                    <CheckCircle className="w-4 h-4" />
                    Geaccepteerd
                </span>
            );
        }
        return (
            <span
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                style={{ background: '#fff3cd', color: '#856404' }}
            >
                <Loader2 className="w-4 h-4 animate-spin" />
                In behandeling
            </span>
        );
    };

    return (
        <>
            <Head title="Mijn Profiel - Populytics">
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
                        Terug naar shop
                    </Link>
                </header>

                {/* Profile Content */}
                <main className="px-6 py-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Profile Header */}
                        <div
                            className="p-6 rounded-lg mb-8"
                            style={{
                                background: 'white',
                                boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center"
                                    style={{ background: 'linear-gradient(135deg, #00A6D6 0%, #004876 100%)' }}
                                >
                                    <User className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1
                                        className="text-2xl"
                                        style={{
                                            fontFamily: '"NexaText-Bold", sans-serif',
                                            color: '#004876',
                                        }}
                                    >
                                        {auth.user?.name}
                                    </h1>
                                    <p style={{ color: '#004876', opacity: 0.7 }}>
                                        {auth.user?.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Orders Section */}
                        <div className="mb-6">
                            <h2
                                className="text-xl mb-4 flex items-center gap-2"
                                style={{
                                    fontFamily: '"NexaText-Bold", sans-serif',
                                    color: '#004876',
                                }}
                            >
                                <Package className="w-5 h-5" />
                                Mijn Bestellingen
                            </h2>
                        </div>

                        {orders.length === 0 ? (
                            <div
                                className="text-center py-16 rounded-lg"
                                style={{
                                    background: 'white',
                                    boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <ShoppingBag
                                    className="w-16 h-16 mx-auto mb-4"
                                    style={{ color: '#00A6D6' }}
                                />
                                <h3
                                    className="text-xl mb-2"
                                    style={{
                                        fontFamily: '"NexaText-Bold", sans-serif',
                                        color: '#004876',
                                    }}
                                >
                                    Nog geen bestellingen
                                </h3>
                                <p className="mb-6" style={{ color: '#004876', opacity: 0.7 }}>
                                    Je hebt nog geen bestellingen geplaatst.
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
                                    <ShoppingBag className="w-4 h-4" />
                                    Bekijk producten
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <Link
                                        key={order.id}
                                        href={`/orders/${order.id}`}
                                        className="block rounded-lg overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
                                        style={{
                                            background: 'white',
                                            boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        {/* Order Header */}
                                        <div
                                            className="p-4 flex flex-wrap items-center justify-between gap-4"
                                            style={{ borderBottom: '1px solid #e9f3f8' }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div>
                                                    <p
                                                        className="text-sm"
                                                        style={{ color: '#004876', opacity: 0.7 }}
                                                    >
                                                        Bestelling #{order.id}
                                                    </p>
                                                    <p
                                                        className="flex items-center gap-1"
                                                        style={{
                                                            fontFamily: '"NexaText-Bold", sans-serif',
                                                            color: '#004876',
                                                        }}
                                                    >
                                                        <Clock className="w-4 h-4" />
                                                        {formatDate(order.created_at)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {getStatusBadge(order.status)}
                                                <span
                                                    className="text-xl"
                                                    style={{
                                                        fontFamily: '"NexaText-Heavy", sans-serif',
                                                        color: '#00A6D6',
                                                    }}
                                                >
                                                    €{Number(order.total_price).toFixed(2)}
                                                </span>
                                                <ChevronRight className="w-5 h-5" style={{ color: '#004876', opacity: 0.5 }} />
                                            </div>
                                        </div>

                                        {/* Order Products */}
                                        <div className="p-4">
                                            <div className="space-y-3">
                                                {order.products.map((product) => (
                                                    <div
                                                        key={product.id}
                                                        className="flex items-center gap-4"
                                                    >
                                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                            <img
                                                                src={product.image_url}
                                                                alt={product.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p
                                                                className="truncate"
                                                                style={{
                                                                    fontFamily: '"NexaText-Bold", sans-serif',
                                                                    color: '#004876',
                                                                }}
                                                            >
                                                                {product.title}
                                                            </p>
                                                            <p
                                                                className="text-sm"
                                                                style={{ color: '#004876', opacity: 0.7 }}
                                                            >
                                                                {product.pivot.quantity}x €{Number(product.pivot.price_at_purchase).toFixed(2)}
                                                            </p>
                                                        </div>
                                                        <span
                                                            style={{
                                                                fontFamily: '"NexaText-Bold", sans-serif',
                                                                color: '#004876',
                                                            }}
                                                        >
                                                            €{(product.pivot.quantity * Number(product.pivot.price_at_purchase)).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
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
