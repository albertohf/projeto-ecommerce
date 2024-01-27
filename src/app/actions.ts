"use server";

export async function fetchProducts({
  lastProductId,
}: {
  lastProductId?: string | undefined;
}) {
  const params = lastProductId
    ? { starting_after: lastProductId, limit: 6 }
    : { limit: 12 };

  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
