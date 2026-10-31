// client/src/App.tsx
import { RouterProvider } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { router } from "./routers/router";

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
