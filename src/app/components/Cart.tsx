"use client";

import { IoTicketOutline } from "react-icons/io5";
import { useCartStore } from "@/store";
import CartDrawer from "./CartDrawer";

export default function Cart() {
  const useStorage = useCartStore();

  return (
    <>
      <div
        onClick={() => {
          useStorage.toggleCart();
        }}
        className="flex items-center cursor-pointer relative"
      >
        <IoTicketOutline size={36} color="#FFF" />
        {useStorage.cart.length > 0 && (
          <span className="bg-white text-sm text-black font-bold rounded-full h-5 w-5 flex items-center justify-center absolute left-8 bottom-5">
            {useStorage.cart.length}
          </span>
        )}
      </div>
      {!useStorage.isOpen && <CartDrawer />}
    </>
  );
}
