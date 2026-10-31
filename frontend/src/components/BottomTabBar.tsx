
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { NAV, type NavItem } from "../config/navigation";
import { useCart } from "../context/CartContext";
import { focusRing } from "../utils/styles";
import CartBadge from "./CartBadge";

function Tab({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      aria-current={active ? "page" : undefined}
      className={`flex h-16 flex-col items-center justify-center gap-1 text-xs ${focusRing} ${
        active ? "font-semibold text-[#14201B]" : "text-[#14201B]/55"
      }`}
    >
      <Icon
        className="h-6 w-6"
        strokeWidth={active ? 2.5 : 2}
        aria-hidden="true"
      />
      {item.label}
    </Link>
  );
}

export default function BottomTabBar() {
  const location = useLocation();
  const { count, openCart } = useCart();

  const tab = (item: NavItem) => (
    <Tab key={item.to} item={item} active={item.isActive(location)} />
  );

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#14201B]/10 bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="grid grid-cols-5">
        {tab(NAV.home)}
        {tab(NAV.shop)}

        <div className="flex items-center justify-center">
          <button
            onClick={openCart}
            aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
            className={`relative flex h-14 w-14 -translate-y-3 items-center justify-center rounded-full bg-[#14201B] text-white shadow-lg ${focusRing}`}
          >
            <ShoppingBag className="h-6 w-6" aria-hidden="true" />
            <CartBadge count={count} />
          </button>
        </div>

        {tab(NAV.saved)}
        {tab(NAV.account)}
      </div>
    </nav>
  );
}
