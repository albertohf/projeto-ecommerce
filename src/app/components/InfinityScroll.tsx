"use client";
import { Product } from "@/types/ProductType";
import { useCallback, useEffect, useState } from "react";
import ProductCard from "./Product";
import { useInView } from "react-intersection-observer";
import { fetchProducts } from "../actions";

export default function InfinityScroll({
  initialProducts,
}: {
  initialProducts: Product;
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const lastProductId = products[products.length - 1];

  const LoadMoreProducts = useCallback(async () => {
    setIsLoading(true);
    const res = await fetchProducts({ lastProductId });
    if (res) {
      setProducts((prevProducts) => [...prevProducts, ...res.json()]);
      setHasMore(res.json().length > 0);
    }
    setIsLoading(false);
  }, [lastProductId]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      LoadMoreProducts();
    }
  }, [hasMore, inView, isLoading, LoadMoreProducts]);

  if (!products) {
    return (
      <div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {hasMore && <div ref={ref}>Carregando mais geristros...</div>}
    </>
  );
}
