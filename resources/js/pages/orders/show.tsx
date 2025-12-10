import { Head, Link } from '@inertiajs/react';
import { Package, ArrowLeft, Clock, CheckCircle, Loader2, MapPin, Mail } from 'lucide-react';

interface OrderProduct {
    id: number;
    title: string;
    description: string;
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
    user: {
        name: string;
        email: string;
    };
}

interface OrderShowProps {
    order: Order;
}

export default function OrderShow({ order }: OrderShowProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('nl-NL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusInfo = (status: 'processing' | 'accepted') => {
        if (status === 'accepted') {
            return {
                label: 'Geaccepteerd',
                description: 'Je bestelling is geaccepteerd en wordt voorbereid voor verzending.',
                icon: <CheckCircle className="w-6 h-6" />,
                bgColor: '#d4edda',
                textColor: '#155724',
            };
        }
        return {
            label: 'In behandeling',
            description: 'Je bestelling wordt momenteel verwerkt.',
            icon: <Loader2 className="w-6 h-6 animate-spin" />,
            bgColor: '#fff3cd',
            textColor: '#856404',
        };
    };

    const statusInfo = getStatusInfo(order.status);
    const subtotal = order.products.reduce(
        (sum, p) => sum + p.pivot.quantity * Number(p.pivot.price_at_purchase),
        0
    );
    const shipping = subtotal >= 50 ? 0 : 4.95;

    return (
        <>
            <Head title={`Bestelling #${order.id} - Populytics`}>
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
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 rounded transition-all hover:opacity-80"
                        style={{ color: '#004876' }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Terug naar profiel
                    </Link>
                </header>

                {/* Order Content */}
                <main className="px-6 py-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Order Header */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-2">
                                <Package className="w-6 h-6" style={{ color: '#00A6D6' }} />
                                <h1
                                    className="text-3xl"
                                    style={{
                                        fontFamily: '"NexaText-Bold", sans-serif',
                                        color: '#004876',
                                    }}
                                >
                                    Bestelling #{order.id}
                                </h1>
                            </div>
                            <p className="flex items-center gap-2" style={{ color: '#004876', opacity: 0.7 }}>
                                <Clock className="w-4 h-4" />
                                Geplaatst op {formatDate(order.created_at)}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Left Column - Products */}
                            <div className="lg:col-span-2 space-y-4">
                                {/* Status Card */}
                                <div
                                    className="p-4 rounded-lg flex items-center gap-4"
                                    style={{ background: statusInfo.bgColor }}
                                >
                                    <div style={{ color: statusInfo.textColor }}>
                                        {statusInfo.icon}
                                    </div>
                                    <div>
                                        <p
                                            style={{
                                                fontFamily: '"NexaText-Bold", sans-serif',
                                                color: statusInfo.textColor,
                                            }}
                                        >
                                            {statusInfo.label}
                                        </p>
                                        <p className="text-sm" style={{ color: statusInfo.textColor, opacity: 0.8 }}>
                                            {statusInfo.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Products */}
                                <div
                                    className="rounded-lg overflow-hidden"
                                    style={{
                                        background: 'white',
                                        boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <div
                                        className="p-4"
                                        style={{ borderBottom: '1px solid #e9f3f8' }}
                                    >
                                        <h2
                                            style={{
                                                fontFamily: '"NexaText-Bold", sans-serif',
                                                color: '#004876',
                                            }}
                                        >
                                            Producten ({order.products.length})
                                        </h2>
                                    </div>

                                    <div className="divide-y" style={{ borderColor: '#e9f3f8' }}>
                                        {order.products.map((product) => (
                                            <div key={product.id} className="p-4 flex gap-4">
                                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={product.image_url}
                                                        alt={product.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3
                                                        className="mb-1"
                                                        style={{
                                                            fontFamily: '"NexaText-Bold", sans-serif',
                                                            color: '#004876',
                                                        }}
                                                    >
                                                        {product.title}
                                                    </h3>
                                                    <p
                                                        className="text-sm mb-2 line-clamp-2"
                                                        style={{ color: '#004876', opacity: 0.7 }}
                                                    >
                                                        {product.description}
                                                    </p>
                                                    <p className="text-sm" style={{ color: '#004876' }}>
                                                        {product.pivot.quantity}x €{Number(product.pivot.price_at_purchase).toFixed(2)}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span
                                                        style={{
                                                            fontFamily: '"NexaText-Heavy", sans-serif',
                                                            color: '#004876',
                                                        }}
                                                    >
                                                        €{(product.pivot.quantity * Number(product.pivot.price_at_purchase)).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Summary */}
                            <div className="lg:col-span-1 space-y-4">
                                {/* Order Summary */}
                                <div
                                    className="p-6 rounded-lg"
                                    style={{
                                        background: 'white',
                                        boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <h2
                                        className="mb-4"
                                        style={{
                                            fontFamily: '"NexaText-Bold", sans-serif',
                                            color: '#004876',
                                        }}
                                    >
                                        Overzicht
                                    </h2>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between">
                                            <span style={{ color: '#004876', opacity: 0.7 }}>Subtotaal</span>
                                            <span style={{ color: '#004876' }}>€{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span style={{ color: '#004876', opacity: 0.7 }}>Verzendkosten</span>
                                            <span style={{ color: shipping === 0 ? '#00A6D6' : '#004876' }}>
                                                {shipping === 0 ? 'Gratis' : `€${shipping.toFixed(2)}`}
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className="flex justify-between pt-4"
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
                                            €{Number(order.total_price).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Delivery Info */}
                                <div
                                    className="p-6 rounded-lg"
                                    style={{
                                        background: 'white',
                                        boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <h2
                                        className="mb-4"
                                        style={{
                                            fontFamily: '"NexaText-Bold", sans-serif',
                                            color: '#004876',
                                        }}
                                    >
                                        Bezorginformatie
                                    </h2>

                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <Mail className="w-5 h-5 mt-0.5" style={{ color: '#00A6D6' }} />
                                            <div>
                                                <p
                                                    className="text-sm"
                                                    style={{ color: '#004876', opacity: 0.7 }}
                                                >
                                                    E-mail
                                                </p>
                                                <p style={{ color: '#004876' }}>{order.user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-5 h-5 mt-0.5" style={{ color: '#00A6D6' }} />
                                            <div>
                                                <p
                                                    className="text-sm"
                                                    style={{ color: '#004876', opacity: 0.7 }}
                                                >
                                                    Verwachte levering
                                                </p>
                                                <p style={{ color: '#004876' }}>2-4 werkdagen</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
