import { Head, Link } from '@inertiajs/react';
import { ShieldX, ArrowLeft, Home } from 'lucide-react';

export default function UnauthorizedOrder() {
    return (
        <>
            <Head title="Geen toegang - Populytics">
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
                className="min-h-screen flex items-center justify-center"
                style={{
                    fontFamily: '"NexaText-Book", sans-serif',
                    color: '#004876',
                    background: 'linear-gradient(0deg, #e9f3f8 0%, white 100%)',
                }}
            >
                <div className="text-center px-6">
                    {/* Icon */}
                    <div
                        className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
                        style={{ background: '#fee2e2' }}
                    >
                        <ShieldX className="w-12 h-12" style={{ color: '#dc2626' }} />
                    </div>

                    {/* Title */}
                    <h1
                        className="text-4xl mb-4"
                        style={{
                            fontFamily: '"NexaText-Bold", sans-serif',
                            color: '#004876',
                        }}
                    >
                        Geen toegang
                    </h1>

                    {/* Message */}
                    <p
                        className="text-lg mb-8 max-w-md mx-auto"
                        style={{ color: '#004876', opacity: 0.8, lineHeight: 1.7 }}
                    >
                        Je hebt geen toegang tot deze bestelling.
                        Je kunt alleen je eigen bestellingen bekijken.
                    </p>

                    {/* Actions */}
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
                            <ArrowLeft className="w-5 h-5" />
                            Mijn bestellingen
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
                            <Home className="w-5 h-5" />
                            Terug naar shop
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
