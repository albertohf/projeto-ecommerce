import { useCartStore } from "@/store";

export default function CheckoutButton() {
  const useStorage = useCartStore();

  const totalPrice = useStorage.cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div className="absolute w-full bottom-0 right-0">
      <div className="flex flex-row justify-between items-center px-6">
        <p>Valor Total: </p>
        <p className="text-teal-600 text-sm font-bold text-end">
          {totalPrice.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
      <button
        onClick={() => useStorage.setCheckout("checkout")}
        className="w-[93%] bg-teal-600 text-white py-2 rounded-md m-3"
      >
        Finalizar Compra
      </button>
    </div>
  );
}
