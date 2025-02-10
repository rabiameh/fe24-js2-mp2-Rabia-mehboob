import Product from "./product";

type ProductArray = Product[];


export const filterCategory = (
  products: ProductArray,
  category: string
): ProductArray =>
  products.filter((product) => product.getCategory() === category);

export const filterMaxPrice = (
  products: ProductArray,
  maxPrice: number
): ProductArray =>
  products.filter((product) => product.getDiscountedPrice() <= maxPrice);
