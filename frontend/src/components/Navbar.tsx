// client/src/components/Navbar.tsx
// Desktop: full navbar. Phone: logo only (navigation moves to BottomTabBar).
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { DESKTOP_LINKS, NAV } from "../config/navigation";
import { useCart } from "../context/CartContext";
import { focusRing } from "../utils/styles";
import CartBadge from "./CartBadge";

export default function Navbar() {
  const location = useLocation();
  const { count, openCart } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-[#14201B]/10 bg-[#EEF1EC]/90 pt-[env(safe-area-inset-top)] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link
          to="/"
          className={`font-display text-2xl font-bold tracking-tight ${focusRing}`}
        >
          Khmer25H
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {DESKTOP_LINKS.map((item) => {
            const active = item.isActive(location);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${focusRing} ${
                  active ? "bg-[#14201B] text-white" : "hover:bg-[#14201B]/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            to={NAV.account.to}
            className={`text-sm font-medium ${focusRing}`}
          >
            Sign in
          </Link>
          <button
            onClick={openCart}
            aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
            className={`relative flex items-center gap-2 rounded-full border-2 border-[#14201B] px-4 py-1.5 text-sm font-medium ${focusRing}`}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            Cart
            <CartBadge count={count} />
          </button>
        </div>
      </div>
    </header>
  );
}
