import { fetchProducts } from "./actions";
// import InfinityScroll from "./components/InfinityScroll";
import { Product } from "@/types/ProductType";
import ProductCard from "./components/Product";

export default async function Home() {
  const products = await fetchProducts({});

  return (
    <div className="container mx-auto pt-8 px-8 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {/* <InfinityScroll initialProducts={products} /> */}
      </div>
    </div>
  );
}
