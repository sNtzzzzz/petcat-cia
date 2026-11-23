import type { CartItem } from "../types";
import { catalog } from "./catalog";
const KEY = "pet-cat-cia:cart:v1";
export function readCart(): CartItem[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    if (!Array.isArray(raw)) return [];
    const merged = new Map<string, number>();
    for (const item of raw) {
      if (
        item &&
        typeof item.productId === "string" &&
        catalog.byId(item.productId) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
      )
        merged.set(
          item.productId,
          Math.min(99, (merged.get(item.productId) ?? 0) + item.quantity),
        );
    }
    return [...merged].map(([productId, quantity]) => ({
      productId,
      quantity,
    }));
  } catch {
    return [];
  }
}
export function saveCart(items: CartItem[]): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
    return true;
  } catch {
    return false;
  }
}
