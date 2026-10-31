// client/src/config/navigation.ts
import type { Location } from "react-router-dom";
import { Heart, House, Info ,Mail, Store, User, type LucideIcon } from "lucide-react";

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  isActive: (location: Location) => boolean;
};

const onHome = (l: Location) => l.pathname === "/";

export const NAV = {
  home: {
    to: "/",
    label: "Home",
    icon: House,
    isActive: (l) => onHome(l) && l.hash !== "#batch",
  },
  about: {
    to: "/about",
    label: "About",
    icon: Info,
    isActive: (l) => l.pathname.startsWith("/about"),
  },
  contact: {
    to: "/contact",
    label: "Contact",
    icon: Mail,
    isActive: (l) => l.pathname.startsWith("/contact"),
  },
  shop: {
    to: "/#batch",
    label: "Shop",
    icon: Store,
    isActive: (l) => onHome(l) && l.hash === "#batch",
  },
  saved: {
    to: "/saved",
    label: "Saved",
    icon: Heart,
    isActive: (l) => l.pathname.startsWith("/saved"),
  },
  account: {
    to: "/login",
    label: "Account",
    icon: User,
    isActive: (l) => l.pathname.startsWith("/login"),
  },
} satisfies Record<string, NavItem>;

// Links shown in the desktop navbar
export const DESKTOP_LINKS: NavItem[] = [NAV.home , NAV.about,  NAV.contact, NAV.shop, NAV.saved];