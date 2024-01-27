"use client";
import { useCartStore } from "@/store";
import { useEffect } from "react";
import { NextResponse } from "next/server";

export default function Checkout() {
  const cartStore = useCartStore();
  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartStore.cart,
      }),
    }).then((data) => {
      console.log(data);
    });
  }, [cartStore.cart]);

  return (
    <div>
      <h1>Checkout</h1>
    </div>
  );
}
