import { Head, Link, router } from '@inertiajs/react';
import { Package, ArrowLeft, Clock, User, Mail, ChevronRight, Check } from 'lucide-react';
import { Toaster, toast } from 'sonner';

interface OrderProduct {
    id: number;
    title: string;
    image_url: string;
    pivot: {
        quantity: number;
        price_at_purchase: number;
    };
}

interface OrderUser {
    id: number;
    name: string;
    email: string;
}

interface Order {
    id: number;
    total_price: number;
    status: 'processing' | 'accepted';
    created_at: string;
    products: OrderProduct[];
    user: OrderUser;
}

interface AdminOrdersProps {
    orders: Order[];
}

export default function AdminOrders({ orders = [] }: AdminOrdersProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('nl-NL', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleStatusChange = (orderId: number, newStatus: string) => {
        router.patch(`/admin/orders/${orderId}/status`, { status: newStatus }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Status bijgewerkt', {
                    style: {
                        background: '#004876',
                        color: 'white',
                        border: 'none',
                    },
                });
            },
        });
    };

    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_price), 0);
    const processingOrders = orders.filter(o => o.status === 'processing').length;
    const acceptedOrders = orders.filter(o => o.status === 'accepted').length;

    return (
        <>
            <Head title="Bestellingen Beheer - Populytics">
                <style>{`
                    .status-select {
                        appearance: none;
                        cursor: pointer;
                        padding-right: 2rem;
                        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
                        background-repeat: no-repeat;
                        background-position: right 0.5rem center;
                    }
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
                            Populytics Admin
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

                {/* Content */}
                <main className="px-6 py-12">
                    <div className="max-w-6xl mx-auto">
                        <h1
                            className="text-3xl mb-8"
                            style={{
                                fontFamily: '"NexaText-Bold", sans-serif',
                                color: '#004876',
                            }}
                        >
                            Bestellingen Beheer
                        </h1>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            <div
                                className="p-6 rounded-lg"
                                style={{
                                    background: 'white',
                                    boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <p className="text-sm mb-1" style={{ color: '#004876', opacity: 0.7 }}>
                                    Totaal Bestellingen
                                </p>
                                <p
                                    className="text-3xl"
                                    style={{
                                        fontFamily: '"NexaText-Heavy", sans-serif',
                                        color: '#004876',
                                    }}
                                >
                                    {orders.length}
                                </p>
                            </div>

                            <div
                                className="p-6 rounded-lg"
                                style={{
                                    background: 'white',
                                    boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <p className="text-sm mb-1" style={{ color: '#004876', opacity: 0.7 }}>
                                    Totale Omzet
                                </p>
                                <p
                                    className="text-3xl"
                                    style={{
                                        fontFamily: '"NexaText-Heavy", sans-serif',
                                        color: '#00A6D6',
                                    }}
                                >
                                    €{totalRevenue.toFixed(2)}
                                </p>
                            </div>

                            <div
                                className="p-6 rounded-lg"
                                style={{
                                    background: '#fff3cd',
                                    boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <p className="text-sm mb-1" style={{ color: '#856404' }}>
                                    In Behandeling
                                </p>
                                <p
                                    className="text-3xl"
                                    style={{
                                        fontFamily: '"NexaText-Heavy", sans-serif',
                                        color: '#856404',
                                    }}
                                >
                                    {processingOrders}
                                </p>
                            </div>

                            <div
                                className="p-6 rounded-lg"
                                style={{
                                    background: '#d4edda',
                                    boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <p className="text-sm mb-1" style={{ color: '#155724' }}>
                                    Geaccepteerd
                                </p>
                                <p
                                    className="text-3xl"
                                    style={{
                                        fontFamily: '"NexaText-Heavy", sans-serif',
                                        color: '#155724',
                                    }}
                                >
                                    {acceptedOrders}
                                </p>
                            </div>
                        </div>

                        {/* Orders List */}
                        {orders.length === 0 ? (
                            <div
                                className="text-center py-16 rounded-lg"
                                style={{
                                    background: 'white',
                                    boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <Package
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
                                    Geen bestellingen
                                </h2>
                                <p style={{ color: '#004876', opacity: 0.7 }}>
                                    Er zijn nog geen bestellingen geplaatst.
                                </p>
                            </div>
                        ) : (
                            <div
                                className="rounded-lg overflow-hidden"
                                style={{
                                    background: 'white',
                                    boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                {/* Table Header */}
                                <div
                                    className="grid grid-cols-12 gap-4 p-4 text-sm"
                                    style={{
                                        background: '#004876',
                                        color: 'white',
                                        fontFamily: '"NexaText-Bold", sans-serif',
                                    }}
                                >
                                    <div className="col-span-1">ID</div>
                                    <div className="col-span-3">Klant</div>
                                    <div className="col-span-3">Producten</div>
                                    <div className="col-span-2">Datum</div>
                                    <div className="col-span-2">Status</div>
                                    <div className="col-span-1 text-right">Totaal</div>
                                </div>

                                {/* Table Body */}
                                <div className="divide-y" style={{ borderColor: '#e9f3f8' }}>
                                    {orders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="col-span-1">
                                                <span
                                                    style={{
                                                        fontFamily: '"NexaText-Bold", sans-serif',
                                                        color: '#004876',
                                                    }}
                                                >
                                                    #{order.id}
                                                </span>
                                            </div>

                                            <div className="col-span-3">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                                        style={{ background: '#e9f3f8' }}
                                                    >
                                                        <User className="w-5 h-5" style={{ color: '#004876' }} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p
                                                            className="truncate"
                                                            style={{
                                                                fontFamily: '"NexaText-Bold", sans-serif',
                                                                color: '#004876',
                                                            }}
                                                        >
                                                            {order.user.name}
                                                        </p>
                                                        <p
                                                            className="text-sm truncate flex items-center gap-1"
                                                            style={{ color: '#004876', opacity: 0.7 }}
                                                        >
                                                            <Mail className="w-3 h-3" />
                                                            {order.user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex -space-x-2">
                                                        {order.products.slice(0, 3).map((product) => (
                                                            <div
                                                                key={product.id}
                                                                className="w-8 h-8 rounded-full overflow-hidden border-2 border-white"
                                                            >
                                                                <img
                                                                    src={product.image_url}
                                                                    alt={product.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <span
                                                        className="text-sm"
                                                        style={{ color: '#004876', opacity: 0.7 }}
                                                    >
                                                        {order.products.length} product{order.products.length !== 1 ? 'en' : ''}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="col-span-2">
                                                <p
                                                    className="text-sm flex items-center gap-1"
                                                    style={{ color: '#004876' }}
                                                >
                                                    <Clock className="w-4 h-4" />
                                                    {formatDate(order.created_at)}
                                                </p>
                                            </div>

                                            <div className="col-span-2">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    className="status-select px-3 py-1.5 rounded-full text-sm font-medium border-0 outline-none"
                                                    style={{
                                                        background: order.status === 'accepted' ? '#d4edda' : '#fff3cd',
                                                        color: order.status === 'accepted' ? '#155724' : '#856404',
                                                    }}
                                                >
                                                    <option value="processing">In behandeling</option>
                                                    <option value="accepted">Geaccepteerd</option>
                                                </select>
                                            </div>

                                            <div className="col-span-1 text-right flex items-center justify-end gap-2">
                                                <span
                                                    style={{
                                                        fontFamily: '"NexaText-Heavy", sans-serif',
                                                        color: '#00A6D6',
                                                    }}
                                                >
                                                    €{Number(order.total_price).toFixed(2)}
                                                </span>
                                                <Link href={`/orders/${order.id}`}>
                                                    <ChevronRight className="w-4 h-4 hover:opacity-70" style={{ color: '#004876' }} />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
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
