import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
    cart: any[];
    // addItem: (item: any) => void;
    // removeItem: (id: string) => void;
    // clearCart: () => void;
    // totalPrice: number;
    // totalQuantity: number;
    // increaseQuantity: (id: string) => void;
    // decreaseQuantity: (id: string) => void;
    isOpen: boolean;
    toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist((set) => ({
        cart: [],
        isOpen: false,
        toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
    }), {name: 'cart-storage'})
) 