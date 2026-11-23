import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../types";
import { readCart, saveCart } from "../services/cartStorage";
import { catalog } from "../services/catalog";
interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (id: string, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  toast: string;
  undo: (() => void) | null;
  storageFailed: boolean;
}
const CartContext = createContext<CartContextValue | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart);
  const [toast, setToast] = useState("");
  const [undoItem, setUndoItem] = useState<CartItem | null>(null);
  const [storageFailed, setStorageFailed] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    setStorageFailed(!saveCart(items));
  }, [items]);
  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );
  function notify(message: string, removed: CartItem | null = null) {
    setToast(message);
    setUndoItem(removed);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(
      () => {
        setToast("");
        setUndoItem(null);
      },
      removed ? 10000 : 3500,
    );
  }
  function add(id: string, quantity = 1) {
    const product = catalog.byId(id);
    if (!product) return;
    setItems((old) => {
      const existing = old.find((i) => i.productId === id);
      return existing
        ? old.map((i) =>
            i.productId === id
              ? { ...i, quantity: Math.min(99, i.quantity + quantity) }
              : i,
          )
        : [
            ...old,
            { productId: id, quantity: Math.min(99, Math.max(1, quantity)) },
          ];
    });
    notify(`${product.name} adicionado ao carrinho.`);
  }
  function remove(id: string) {
    const item = items.find((i) => i.productId === id);
    setItems((old) => old.filter((i) => i.productId !== id));
    notify("Produto removido do carrinho.", item ?? null);
  }
  function setQuantity(id: string, quantity: number) {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) return;
    setItems((old) =>
      old.map((i) => (i.productId === id ? { ...i, quantity } : i)),
    );
  }
  const undo = undoItem
    ? () => {
        const removed = undoItem;
        setItems((old) =>
          old.some((i) => i.productId === removed.productId)
            ? old.map((i) =>
                i.productId === removed.productId
                  ? {
                      ...i,
                      quantity: Math.min(99, i.quantity + removed.quantity),
                    }
                  : i,
              )
            : [...old, removed],
        );
        notify("Produto restaurado no carrinho.");
      }
    : null;
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + (catalog.byId(i.productId)?.priceCents ?? 0) * i.quantity,
    0,
  );
  return (
    <CartContext.Provider
      value={{
        items,
        count,
        subtotal,
        add,
        setQuantity,
        remove,
        toast,
        undo,
        storageFailed,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("CartProvider ausente");
  return value;
}
