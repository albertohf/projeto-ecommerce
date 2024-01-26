import { useCartStore } from "@/store";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CheckoutButton() {
  const router = useRouter();
  const useStorage = useCartStore();
  const { user } = useUser();

  const totalPrice = useStorage.cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const handlerCheckout = async () => {
    if (!user) {
      useStorage.toggleCart();
      router.push(`/sign-in?redirectUrl='/'`);
      return;
    }
    useStorage.setCheckout("checkout");
  };

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
        onClick={() => handlerCheckout()}
        className="w-[93%] bg-teal-600 text-white py-2 rounded-md m-3"
      >
        Finalizar Compra
      </button>
    </div>
  );
}
