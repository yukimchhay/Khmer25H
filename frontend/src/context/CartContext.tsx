// client/src/context/CartContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import { getGlaze, getSize } from "../data/products";

export type CartItem = { glazeId: string; sizeId: string; qty: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  stockLeft: (glazeId: string) => number;
  addItem: (glazeId: string, sizeId: string) => void;
  changeQty: (index: number, delta: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const count = items.reduce((n, item) => n + item.qty, 0);
  const total = items.reduce(
    (sum, item) => sum + item.qty * getSize(item.sizeId).price,
    0,
  );

  const stockLeft = (glazeId: string) =>
    getGlaze(glazeId).stock -
    items
      .filter((item) => item.glazeId === glazeId)
      .reduce((n, item) => n + item.qty, 0);

  const addItem = (glazeId: string, sizeId: string) => {
    if (stockLeft(glazeId) <= 0) return;
    setItems((prev) => {
      const index = prev.findIndex(
        (i) => i.glazeId === glazeId && i.sizeId === sizeId,
      );
      if (index === -1) return [...prev, { glazeId, sizeId, qty: 1 }];
      return prev.map((item, i) =>
        i === index ? { ...item, qty: item.qty + 1 } : item,
      );
    });
    setIsOpen(true);
  };

  const changeQty = (index: number, delta: number) => {
    const target = items[index];
    if (!target || (delta > 0 && stockLeft(target.glazeId) <= 0)) return;
    setItems((prev) =>
      prev
        .map((item, i) =>
          i === index ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        stockLeft,
        addItem,
        changeQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
