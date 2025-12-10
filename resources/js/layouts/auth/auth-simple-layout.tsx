import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <>
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
            <div
                className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
                style={{
                    fontFamily: '"NexaText-Book", sans-serif',
                    background: 'linear-gradient(180deg, #0066A2 0%, #004876 100%)',
                }}
            >
                <div className="w-full max-w-md">
                    <div
                        className="flex flex-col gap-8 p-8 rounded-lg"
                        style={{
                            background: 'white',
                            boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.15)',
                        }}
                    >
                        <div className="flex flex-col items-center gap-4">
                            <Link
                                href={home()}
                                className="flex flex-col items-center gap-2"
                            >
                                {/* Populytics Logo */}
                                <div className="flex items-center gap-3 mb-2">
                                    <svg
                                        viewBox="0 0 100 100"
                                        className="w-12 h-12"
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
                            </Link>

                            <div className="space-y-2 text-center">
                                <h1
                                    className="text-2xl"
                                    style={{
                                        fontFamily: '"NexaText-Bold", sans-serif',
                                        color: '#004876',
                                    }}
                                >
                                    {title}
                                </h1>
                                <p
                                    className="text-sm"
                                    style={{ color: '#004876', opacity: 0.7 }}
                                >
                                    {description}
                                </p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>

                {/* Footer */}
                <div
                    className="text-center text-sm"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                    Populytics - Strawinskylaan 339, Amsterdam
                </div>
            </div>
        </>
    );
}
