import React from "react";
import App from "./App";
import "./index.css";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Auth from "./pages/Auth";
import DashboardLayout from "./pages/DashboardLayout";
import AddBookForm from "./components/AddBookForm";
import Library from "./components/Library";
import Dashboard from "./components/Dashboard";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "auth",
    element: <Auth />,
  },
  // protected routes:
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        loader() {
          return redirect("/dashboard/main");
        },
      },
      { path: "library", element: <Library /> },
      { path: "main", element: <Dashboard /> },
    ],
  },
  {
    path: "add",
    element: <AddBookForm />,
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
