import { Outlet, ScrollRestoration } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import CartDrawer from "../components/CartDrawer";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#EEF1EC] pb-[calc(4rem+env(safe-area-inset-bottom))] font-sans text-[#14201B] md:pb-0">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <BottomTabBar />
      <CartDrawer />
      <ScrollRestoration />
    </div>
  );
}
