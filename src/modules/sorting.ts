import Product from "./product";

type SortOrder = "ascending" | "descending";
type SortType = "rate-des" | "rate-asc" | "price-des" | "price-asc" | "default";
type ProductArray = Product[];


const sortByRating = (products: ProductArray, order: SortOrder): ProductArray =>
  [...products].sort((a, b) =>
    order === "descending"
      ? b.getRating() - a.getRating()
      : a.getRating() - b.getRating()
  );

const sortByPrice = (products: ProductArray, order: SortOrder): ProductArray =>
  [...products].sort((a, b) =>
    order === "descending"
      ? b.getDiscountedPrice() - a.getDiscountedPrice()
      : a.getDiscountedPrice() - b.getDiscountedPrice()
  );
export const getSortedProducts = (
  products: ProductArray,
  sortBy: SortType
): ProductArray => {
  if (sortBy === "default") return products;
  if (sortBy === "rate-des") return sortByRating(products, "descending");
  if (sortBy === "rate-asc") return sortByRating(products, "ascending");
  if (sortBy === "price-des") return sortByPrice(products, "descending");
  if (sortBy === "price-asc") return sortByPrice(products, "ascending");
  return products;
};
