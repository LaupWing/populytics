import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: number;
    title: string;
    price: number;
    image_url: string;
    quantity: number;
}

export interface SavedOrder {
    id: string;
    items: CartItem[];
    totalPrice: number;
    totalItems: number;
    createdAt: string;
    updatedAt: string;
}

interface CartStore {
    items: CartItem[];
    savedOrders: SavedOrder[];
    currentOrderId: string | null;
    addItem: (product: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
    saveCurrentOrder: () => void;
    loadSavedOrder: (orderId: string) => void;
    deleteSavedOrder: (orderId: string) => void;
    getSavedOrders: () => SavedOrder[];
}

const generateOrderId = () => {
    return `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            savedOrders: [],
            currentOrderId: null,

            addItem: (product) => {
                set((state) => {
                    const existingItem = state.items.find((item) => item.id === product.id);
                    const now = new Date().toISOString();

                    // Create new order ID if we don't have one
                    const orderId = state.currentOrderId || generateOrderId();

                    if (existingItem) {
                        const newItems = state.items.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        );

                        // Auto-save to savedOrders
                        const updatedSavedOrders = updateSavedOrderInList(
                            state.savedOrders,
                            orderId,
                            newItems,
                            now
                        );

                        return {
                            items: newItems,
                            currentOrderId: orderId,
                            savedOrders: updatedSavedOrders,
                        };
                    }

                    const newItems = [...state.items, { ...product, quantity: 1 }];

                    // Auto-save to savedOrders
                    const updatedSavedOrders = updateSavedOrderInList(
                        state.savedOrders,
                        orderId,
                        newItems,
                        now
                    );

                    return {
                        items: newItems,
                        currentOrderId: orderId,
                        savedOrders: updatedSavedOrders,
                    };
                });
            },

            removeItem: (id) => {
                set((state) => {
                    const newItems = state.items.filter((item) => item.id !== id);
                    const now = new Date().toISOString();

                    if (state.currentOrderId && newItems.length > 0) {
                        const updatedSavedOrders = updateSavedOrderInList(
                            state.savedOrders,
                            state.currentOrderId,
                            newItems,
                            now
                        );
                        return { items: newItems, savedOrders: updatedSavedOrders };
                    }

                    // If cart is empty, remove the saved order
                    if (newItems.length === 0 && state.currentOrderId) {
                        return {
                            items: newItems,
                            savedOrders: state.savedOrders.filter((o) => o.id !== state.currentOrderId),
                            currentOrderId: null,
                        };
                    }

                    return { items: newItems };
                });
            },

            updateQuantity: (id, quantity) => {
                set((state) => {
                    const newItems = state.items
                        .map((item) =>
                            item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
                        )
                        .filter((item) => item.quantity > 0);

                    const now = new Date().toISOString();

                    if (state.currentOrderId && newItems.length > 0) {
                        const updatedSavedOrders = updateSavedOrderInList(
                            state.savedOrders,
                            state.currentOrderId,
                            newItems,
                            now
                        );
                        return { items: newItems, savedOrders: updatedSavedOrders };
                    }

                    // If cart is empty, remove the saved order
                    if (newItems.length === 0 && state.currentOrderId) {
                        return {
                            items: newItems,
                            savedOrders: state.savedOrders.filter((o) => o.id !== state.currentOrderId),
                            currentOrderId: null,
                        };
                    }

                    return { items: newItems };
                });
            },

            clearCart: () => {
                set((state) => ({
                    items: [],
                    currentOrderId: null,
                    // Keep saved orders but remove the current one
                    savedOrders: state.currentOrderId
                        ? state.savedOrders.filter((o) => o.id !== state.currentOrderId)
                        : state.savedOrders,
                }));
            },

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },

            saveCurrentOrder: () => {
                const state = get();
                if (state.items.length === 0) return;

                const now = new Date().toISOString();
                const orderId = state.currentOrderId || generateOrderId();

                const updatedSavedOrders = updateSavedOrderInList(
                    state.savedOrders,
                    orderId,
                    state.items,
                    now
                );

                set({
                    savedOrders: updatedSavedOrders,
                    currentOrderId: orderId,
                });
            },

            loadSavedOrder: (orderId: string) => {
                const state = get();
                const savedOrder = state.savedOrders.find((o) => o.id === orderId);

                if (savedOrder) {
                    set({
                        items: [...savedOrder.items],
                        currentOrderId: orderId,
                    });
                }
            },

            deleteSavedOrder: (orderId: string) => {
                set((state) => ({
                    savedOrders: state.savedOrders.filter((o) => o.id !== orderId),
                    // If deleting current order, clear cart
                    ...(state.currentOrderId === orderId
                        ? { items: [], currentOrderId: null }
                        : {}),
                }));
            },

            getSavedOrders: () => {
                return get().savedOrders;
            },
        }),
        {
            name: 'populytics-cart',
        }
    )
);

// Helper function to update or create a saved order in the list
function updateSavedOrderInList(
    savedOrders: SavedOrder[],
    orderId: string,
    items: CartItem[],
    now: string
): SavedOrder[] {
    const existingOrderIndex = savedOrders.findIndex((o) => o.id === orderId);
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    const newOrder: SavedOrder = {
        id: orderId,
        items: [...items],
        totalPrice,
        totalItems,
        createdAt: existingOrderIndex >= 0 ? savedOrders[existingOrderIndex].createdAt : now,
        updatedAt: now,
    };

    if (existingOrderIndex >= 0) {
        // Update existing order
        const newSavedOrders = [...savedOrders];
        newSavedOrders[existingOrderIndex] = newOrder;
        return newSavedOrders;
    }

    // Add new order
    return [...savedOrders, newOrder];
}
