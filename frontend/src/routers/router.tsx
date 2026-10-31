
// client/src/routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../layouts/Mainlayout'
import HomePage from "../pages/Homepage";
import PlaceholderPage from '../pages/PlaceholderPage'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "saved", element: <PlaceholderPage title="Saved" /> },
      { path: "about", element: <PlaceholderPage title="About" /> },
      { path: "contact", element: <PlaceholderPage title="Contact" /> },
      { path: "login", element: <PlaceholderPage title="Sign in" /> },
      { path: "checkout", element: <PlaceholderPage title="Checkout" /> },
      {
        path: "*",
        element: (
          <PlaceholderPage
            title="Page not found"
            message="The page you're looking for doesn't exist or has moved."
          />
        ),
      },
    ],
  },
]);