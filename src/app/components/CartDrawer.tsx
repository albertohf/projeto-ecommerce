"use client";
import { useCartStore } from "@/store";
import Image from "next/image";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import CheckoutButton from "./CheckoutButton";

export default function CartDrawer() {
  const useStorage = useCartStore();

  return (
    <>
      <div
        onClick={() => {
          useStorage.toggleCart();
        }}
        className="fixed w-full h-screen bg-black/25 left-0 top-0 z-50"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute bg-slate-600 right-0 top-0 w-1/3 h-screen px-8 pt-8"
        >
          <button
            onClick={() => useStorage.toggleCart()}
            className="absolute right-4 top-5 font-bold text-sm"
          >
            Voltar
          </button>
          <div className="border-t border-gray-400 my-4 mt-8"></div>
          <h1 className="absolute left-5 top-4 text-xl text-teal-300">
            Meu Carrinho
          </h1>
          <div className="overflow-y-scroll scrollbar-hide h-[83%]">
            {useStorage.cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-3">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="object-cover w-20"
                />
                <div>
                  <h2 className="sm:w-1/2 md:w-48 lg:w-48 xl:w-64 truncate">
                    {item.title}
                  </h2>
                  <div className="flex flex-row items-center justify-start">
                    <button
                      className="py-1 mt-2"
                      onClick={() => useStorage.addItem(item)}
                    >
                      <CiCirclePlus size={25} color="#FFF" />
                    </button>
                    <h2 className="py-1 px-4 mt-2">{item.quantity}</h2>
                    <button
                      className="py-1 mt-2"
                      onClick={() => useStorage.removeItem(item)}
                    >
                      <CiCircleMinus size={25} color="#FFF" />
                    </button>
                  </div>
                  <p className="text-teal-600 text-sm font-bold mt-2">
                    {(item.price * item.quantity).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {useStorage.cart.length > 0 && useStorage.onCheckout === "cart" && (
            <CheckoutButton />
          )}
        </div>
      </div>
    </>
  );
}
