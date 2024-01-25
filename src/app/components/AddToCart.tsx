"use client";

import { useCartStore } from "@/store";
import { Product } from "@/types/ProductType";

export default function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  return (
    <>
      <button
        onClick={() => {
          addItem(product);
        }}
        className="rounded-md bg-teal-600 text-white px-3.5 py-2.5 text-sm text-center"
      >
        adicionar ao carrinho
      </button>
    </>
  );
}
