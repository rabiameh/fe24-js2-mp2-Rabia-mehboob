import Product from "./product";

type ProductArray = Product[];

export const getAllProducts = async (): Promise<ProductArray> => {
  const url: string = "https://dummyjson.com/products";

  try {
    const res: Response = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return data.products.map((product: any) => new Product(product));
  } catch (error) {
    throw new Error("Error fetching products");
  }
};
