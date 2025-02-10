/**
 * Fetches and renders all products on load from dummyjson.com
 * Handles events for filtering through a form and sorting through a select
 */

import { getAllProducts } from "./modules/dummyjsonapi";
import { renderProducts } from "./modules/gui";
import { filterCategory, filterMaxPrice } from "./modules/filtering";
import { getSortedProducts } from "./modules/sorting";
import Product from "./modules/product";
import type { SortType } from "./modules/types"; // Use `type` to avoid conflicts

/** DOM Elements */
const sortSelect = document.querySelector<HTMLSelectElement>("#sortSelect");
const filterForm = document.querySelector<HTMLFormElement>("#filterForm");

/*** Load and Render products ***/
let products: Product[] = [];
let filteredProducts: Product[] = [];

const loadProducts = async (): Promise<void> => {
  try {
    products = await getAllProducts();
    filteredProducts = products; // Initialize filteredProducts with all products
    renderProducts(products);
  } catch (error) {
    console.error(error);
  }
};
loadProducts();
const isValidSortType = (value: string): value is SortType => {
  return ["rate-des", "rate-asc", "price-des", "price-asc", "default"].includes(
    value
  );
};
filterForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const category =
    filterForm.querySelector<HTMLSelectElement>("select")?.value || "";
  const maxPrice = parseFloat(
    filterForm.querySelector<HTMLInputElement>("input")?.value || "0"
  );

  filteredProducts = category ? filterCategory(products, category) : products;
  if (maxPrice > 0)
    filteredProducts = filterMaxPrice(filteredProducts, maxPrice);
  const selectedSortType: string = sortSelect?.value ?? "default";
  if (isValidSortType(selectedSortType)) {
    renderProducts(
      getSortedProducts(filteredProducts, selectedSortType)
    );
  } else {
    console.warn("Invalid sort type:", selectedSortType);
  }
  sortSelect?.addEventListener("change", () => {
    const selectedSortType: string = sortSelect?.value ?? "default";
    if (isValidSortType(selectedSortType)) {
      renderProducts(getSortedProducts(filteredProducts, selectedSortType));
    } else {
      console.warn("Invalid sort type:", selectedSortType);
    }
  });
});
