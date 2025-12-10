import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: number;
    title: string;
    price: number;
    image_url: string;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (product: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product) => {
                set((state) => {
                    const existingItem = state.items.find((item) => item.id === product.id);

                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { ...product, quantity: 1 }],
                    };
                });
            },

            removeItem: (id) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                }));
            },

            updateQuantity: (id, quantity) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
                    ).filter((item) => item.quantity > 0),
                }));
            },

            clearCart: () => {
                set({ items: [] });
            },

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'populytics-cart',
        }
    )
);
