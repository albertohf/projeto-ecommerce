import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ProductsType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
  quantity: number;
}
interface Rating {
  rate: number;
  count: number;
}

const calculateOrderAmount = (items: ProductsType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price! * item.quantity!;
  }, 0);

  return totalPrice;
};

export async function POST(req: Request) {
  const { userId, getToken } = auth();
  const { items } = await req.json();

  console.log(userId);

  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const total = calculateOrderAmount(items);

  const newOrder = await prisma.ticket.create({
    data: {
      campaignId: "teste1",
      ownerId: userId,
      ticket_value: 3,
    },
  });
  return NextResponse.json({ newOrder }, { status: 200 });
}
