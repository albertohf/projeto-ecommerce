import AddToCart from "@/app/components/AddToCart";
import ProductImage from "@/app/components/ProductImage";
import { Product } from "@/types/ProductType";

interface ProductPageProps {
  params: {
    id: string;
  };
}

async function getProducts(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data;
}

export default async function product({ params: { id } }: ProductPageProps) {
  const product = await getProducts(id);
  console.log(product);
  return (
    <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto gap-8 p-10">
      <ProductImage product={product} />
      <div className="flex flex-col">
        <div className="pb-4">
          <h1 className="text-2xl font-bold text-gray-300">{product.title}</h1>
          <h2 className="text-xl text-teal-600 font-bold">
            R$ {product.price}
          </h2>
        </div>
        <div className="pb-4">
          <p className="text-sm text-gray-400">{product.description}</p>
        </div>
        <AddToCart product={product} />
      </div>
    </div>
  );
}
