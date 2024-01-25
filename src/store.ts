import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/ProductType";

interface CartState {
  cart: any[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  // clearCart: () => void;
  // totalPrice: number;
  // totalQuantity: number;
  // increaseQuantity: (id: string) => void;
  // decreaseQuantity: (id: string) => void;
  isOpen: boolean;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addItem: (item: Product) =>
        set((state) => {
          const newProduct = state.cart.find(
            (product) => product.id === item.id
          );
          if (newProduct) {
            const updatedCart = state.cart.map((p) => {
              if (p.id === newProduct.id) {
                return {
                  ...p,
                  quantity: p.quantity ? p.quantity + 1 : 1,
                };
              }
              return p;
            });
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),
      removeItem: (id: string) =>
        set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { name: "cart-storage" }
  )
);
