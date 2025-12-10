import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

const products = [
    {
        id: 1,
        title: 'DIY Participation Toolkit',
        description: 'Complete kit for schools and organizations to run their own citizen participation workshops. Includes facilitator guide, worksheets, and interactive exercises.',
        price: '€89.00',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
        badge: 'Bestseller',
    },
    {
        id: 2,
        title: 'Policy Making Board Game',
        description: 'An engaging board game that teaches players about trade-offs in policy decisions. Perfect for classrooms, team buildings, and civic education.',
        price: '€49.00',
        image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=300&fit=crop',
        badge: 'New',
    },
];

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Educational Materials Shop - Populytics">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
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
                    style={{
                        position: 'relative',
                        zIndex: 2,
                    }}
                >
                    <div className="flex items-center gap-3">
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
                    </div>

                    <nav className="flex items-center gap-4">
                        {/* Shopping Cart Button */}
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
                                0
                            </Badge>
                        </Button>

                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="px-5 py-2 rounded text-sm transition-all"
                                style={{
                                    fontFamily: '"NexaText-Bold", sans-serif',
                                    background: '#004876',
                                    color: 'white',
                                    border: '2px solid #004876',
                                }}
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="px-5 py-2 rounded text-sm transition-all hover:opacity-80"
                                    style={{
                                        fontFamily: '"NexaText-Bold", sans-serif',
                                        color: '#004876',
                                    }}
                                >
                                    Inloggen
                                </Link>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className="px-5 py-2 rounded text-sm transition-all"
                                        style={{
                                            fontFamily: '"NexaText-Bold", sans-serif',
                                            background: '#00A6D6',
                                            color: 'white',
                                            border: '2px solid #00A6D6',
                                        }}
                                    >
                                        Registreren
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <section
                    className="px-6 py-16 text-center"
                    style={{ background: '#0066A2' }}
                >
                    <div className="max-w-4xl mx-auto">
                        <h1
                            className="text-4xl md:text-5xl mb-6"
                            style={{
                                fontFamily: '"NexaText-Bold", sans-serif',
                                color: 'white',
                                lineHeight: 1.2,
                            }}
                        >
                            Educatieve Materialen
                        </h1>
                        <p
                            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
                            style={{
                                color: 'rgba(255,255,255,0.9)',
                                lineHeight: 1.7,
                            }}
                        >
                            Ontdek onze toolkits, spellen en workshops om burgerparticipatie
                            en beleidskeuzes op een leuke manier te leren.
                        </p>
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{
                                background: '#00A6D6',
                                color: 'white',
                                fontSize: '0.9rem',
                            }}
                        >
                            <span className="animate-pulse">&#9679;</span>
                            <span>Gratis verzending vanaf €50</span>
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                <section className="px-6 py-16">
                    <div className="max-w-5xl mx-auto">
                        <h2
                            className="text-3xl mb-2 text-center"
                            style={{
                                fontFamily: '"NexaText-Bold", sans-serif',
                                color: '#004876',
                            }}
                        >
                            Onze Producten
                        </h2>
                        <p
                            className="text-center mb-12"
                            style={{ color: '#004876', opacity: 0.7 }}
                        >
                            Leer spelenderwijs over participatie en democratie
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="rounded-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                                    style={{
                                        background: 'white',
                                        boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    {/* Product Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover transition-transform hover:scale-105"
                                        />
                                        <span
                                            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
                                            style={{
                                                background: product.badge === 'Bestseller' ? '#00A6D6' : '#004876',
                                                color: 'white',
                                                fontFamily: '"NexaText-Bold", sans-serif',
                                            }}
                                        >
                                            {product.badge}
                                        </span>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-6">
                                        <h3
                                            className="text-xl mb-2"
                                            style={{
                                                fontFamily: '"NexaText-Bold", sans-serif',
                                                color: '#004876',
                                            }}
                                        >
                                            {product.title}
                                        </h3>
                                        <p
                                            className="mb-4 text-sm"
                                            style={{
                                                color: '#004876',
                                                opacity: 0.8,
                                                lineHeight: 1.6,
                                            }}
                                        >
                                            {product.description}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <span
                                                className="text-2xl"
                                                style={{
                                                    fontFamily: '"NexaText-Heavy", sans-serif',
                                                    color: '#00A6D6',
                                                }}
                                            >
                                                {product.price}
                                            </span>
                                            <button
                                                className="px-6 py-2 rounded transition-all hover:opacity-90"
                                                style={{
                                                    fontFamily: '"NexaText-Bold", sans-serif',
                                                    background: '#004876',
                                                    color: 'white',
                                                    border: '2px solid #004876',
                                                }}
                                            >
                                                In winkelwagen
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section
                    className="px-6 py-16"
                    style={{ background: '#004876' }}
                >
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div
                                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                                    style={{ background: '#00A6D6' }}
                                >
                                    <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                                    </svg>
                                </div>
                                <h4
                                    className="text-lg mb-2"
                                    style={{
                                        fontFamily: '"NexaText-Bold", sans-serif',
                                        color: 'white',
                                    }}
                                >
                                    Wetenschappelijk onderbouwd
                                </h4>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                                    Ontwikkeld samen met TU Delft
                                </p>
                            </div>

                            <div>
                                <div
                                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                                    style={{ background: '#00A6D6' }}
                                >
                                    <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                        <circle cx="9" cy="7" r="4"/>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                    </svg>
                                </div>
                                <h4
                                    className="text-lg mb-2"
                                    style={{
                                        fontFamily: '"NexaText-Bold", sans-serif',
                                        color: 'white',
                                    }}
                                >
                                    Voor alle leeftijden
                                </h4>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                                    Van basisschool tot professional
                                </p>
                            </div>

                            <div>
                                <div
                                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                                    style={{ background: '#00A6D6' }}
                                >
                                    <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                        <circle cx="12" cy="7" r="4"/>
                                    </svg>
                                </div>
                                <h4
                                    className="text-lg mb-2"
                                    style={{
                                        fontFamily: '"NexaText-Bold", sans-serif',
                                        color: 'white',
                                    }}
                                >
                                    Nederlandse ondersteuning
                                </h4>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                                    Hulp bij implementatie
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer
                    className="px-6 py-8"
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

                        <div
                            className="text-sm"
                            style={{ color: '#004876', opacity: 0.7 }}
                        >
                            Strawinskylaan 339, 1077 XX Amsterdam
                        </div>

                        <div
                            className="text-sm"
                            style={{ color: '#004876', opacity: 0.7 }}
                        >
                            info@populytics.nl
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
