import { products } from "../data/products";
import type { Category, Product } from "../types";
import type { FilterKey } from "../config/filters";
import { normalize } from "../utils/format";
export interface CatalogQuery {
  query?: string;
  species?: string;
  category?: Category;
  sort?: string;
  filters?: Partial<Record<FilterKey, string>>;
}
export const filterValue = (p: Product, key: FilterKey) =>
  key === "marca" ? p.brand : key === "preco" ? "" : (p.attributes[key] ?? "");
export const catalog = {
  all: () => [...products].sort((a, b) => a.salesRank - b.salesRank),
  byId: (id: string) => products.find((p) => p.id === id || p.slug === id),
  search: ({
    query = "",
    species = "",
    category,
    sort = "",
    filters = {},
  }: CatalogQuery = {}) => {
    const result = products.filter(
      (p) =>
        normalize(p.name + " " + p.size).includes(normalize(query)) &&
        (!species || p.species.some((s) => s === species)) &&
        (!category || p.category === category) &&
        Object.entries(filters).every(([key, value]) => {
          if (!value) return true;
          if (key === "preco")
            return value === "ate-25"
              ? p.priceCents <= 2500
              : value === "25-50"
                ? p.priceCents > 2500 && p.priceCents <= 5000
                : value === "acima-50"
                  ? p.priceCents > 5000
                  : true;
          return filterValue(p, key as FilterKey) === value;
        }),
    );
    return result.sort((a, b) =>
      sort === "price-asc"
        ? a.priceCents - b.priceCents
        : sort === "price-desc"
          ? b.priceCents - a.priceCents
          : a.salesRank - b.salesRank,
    );
  },
};
