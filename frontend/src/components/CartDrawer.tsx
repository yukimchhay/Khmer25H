// client/src/components/CartDrawer.tsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getGlaze, getSize, money } from "../data/products";
import { focusRing } from "../utils/styles";

export default function CartDrawer() {
  const { items, total, isOpen, closeCart, changeQty, stockLeft } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const isEmpty = items.length === 0;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={closeCart} />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-[#14201B]/15 p-5">
          <h2 className="font-display text-2xl font-bold">Your cart</h2>
          <button
            onClick={closeCart}
            className={`text-sm font-medium ${focusRing}`}
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {isEmpty ? (
            <p className="text-[#14201B]/70">
              Your cart is empty. Pick a glaze and add a mug.
            </p>
          ) : (
            <ul className="space-y-5">
              {items.map((item, index) => {
                const glaze = getGlaze(item.glazeId);
                const size = getSize(item.sizeId);
                return (
                  <li
                    key={`${item.glazeId}-${item.sizeId}`}
                    className="flex gap-4"
                  >
                    <span
                      className="mt-1 h-10 w-10 shrink-0 rounded-full"
                      style={{ backgroundColor: glaze.hex }}
                    />
                    <div className="flex-1">
                      <p className="font-medium">
                        {glaze.name} Everyday Mug, {size.label}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-sm">
                        <button
                          onClick={() => changeQty(index, -1)}
                          aria-label="Remove one"
                          className={`h-7 w-7 rounded-full border border-[#14201B]/30 ${focusRing}`}
                        >
                          -
                        </button>
                        <span aria-live="polite">{item.qty}</span>
                        <button
                          onClick={() => changeQty(index, 1)}
                          aria-label="Add one"
                          disabled={stockLeft(item.glazeId) <= 0}
                          className={`h-7 w-7 rounded-full border border-[#14201B]/30 disabled:opacity-40 ${focusRing}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="font-medium">
                      {money(item.qty * size.price)}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-[#14201B]/15 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <p className="mb-4 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{money(total)}</span>
          </p>
          <Link
            to="/checkout"
            onClick={closeCart}
            aria-disabled={isEmpty}
            className={`block rounded-full bg-[#14201B] py-3 text-center font-semibold text-white ${focusRing} ${
              isEmpty ? "pointer-events-none opacity-40" : ""
            }`}
          >
            Go to checkout
          </Link>
        </div>
      </aside>
    </div>
  );
}
