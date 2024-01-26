import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/ProductType";

interface CartState {
  cart: any[];
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
  isOpen: boolean;
  toggleCart: () => void;
  onCheckout: string;
  setCheckout: (checkout: string) => void;
  paymentIntent: string;
  setPaymentIntent: (paymentIntent: string) => void;
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
      removeItem: (item: Product) =>
        set((state) => {
          const existProduct = state.cart.find(
            (product) => product.id === item.id
          );
          if (existProduct && existProduct.quantity! > 1) {
            const updatedCart = state.cart.map((p) => {
              if (p.id === item.id) {
                return {
                  ...p,
                  quantity: p.quantity! - 1,
                };
              }
              return p;
            });
            return { cart: updatedCart };
          } else {
            const filteredCart = state.cart.filter((p) => p.id !== item.id);
            return { cart: filteredCart };
          }
        }),
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      onCheckout: "cart",
      setCheckout: (checkout) => set({ onCheckout: checkout }),
      paymentIntent: "",
      setPaymentIntent: (paymentIntent) => set(() => ({ paymentIntent })),
    }),

    { name: "cart-storage" }
  )
);
