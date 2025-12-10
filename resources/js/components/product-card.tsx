import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { toast } from 'sonner';
import { useState } from 'react';

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image_url: string;
}

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCartStore();
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decrementQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const handleAddToCart = () => {
        // Add the selected quantity to cart
        for (let i = 0; i < quantity; i++) {
            addItem({
                id: product.id,
                title: product.title,
                price: product.price,
                image_url: product.image_url,
            });
        }

        toast.success(`${quantity}x ${product.title} toegevoegd aan winkelwagen`, {
            description: `€${(product.price * quantity).toFixed(2)}`,
            style: {
                background: '#004876',
                color: 'white',
                border: 'none',
            },
        });

        // Reset quantity to 1 after adding
        setQuantity(1);
    };

    return (
        <div
            className="rounded-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl"
            style={{
                background: 'white',
                boxShadow: '3px 3px 13px 2px rgba(0, 0, 0, 0.1)',
            }}
        >
            {/* Product Image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                />
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
                        €{product.price.toFixed(2)}
                    </span>

                    <div className="flex items-center gap-3">
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={decrementQuantity}
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
                                className="text-lg min-w-[1.5rem] text-center"
                                style={{
                                    fontFamily: '"NexaText-Bold", sans-serif',
                                    color: '#004876',
                                }}
                            >
                                {quantity}
                            </span>
                            <button
                                onClick={incrementQuantity}
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

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="px-4 py-2 rounded transition-all hover:opacity-90 flex items-center gap-2"
                            style={{
                                fontFamily: '"NexaText-Bold", sans-serif',
                                background: '#004876',
                                color: 'white',
                                border: '2px solid #004876',
                            }}
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Toevoegen
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
