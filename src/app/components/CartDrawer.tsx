"use client";
import { useCartStore } from "@/store";
import Image from "next/image";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

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
          className="absolute bg-slate-600 right-0 top-0 w-1/3 h-screen p-8 overflow-y-scroll"
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
                <h2 className="w-42 truncate">{item.title}</h2>
                <h2>Quantidade: {item.quantity}</h2>
                <p className="text-teal-600 text-sm font-bold">{item.price}</p>
              </div>
              <button onClick={() => useStorage.addItem(item)}>
                <CiCirclePlus size={25} color="#FFF" />
              </button>
              <button onClick={() => useStorage.removeItem(item.id)}>
                <CiCircleMinus size={25} color="#FFF" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
