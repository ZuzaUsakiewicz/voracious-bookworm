import React from "react";
import { Link, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function DashboardLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>Welcome to your profile!</h1>
        <div>navigation</div>
        <Link to="/add">Add book</Link>
        <Link to="library">your library</Link>
        <Link to="main">dashboard</Link>
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

export default DashboardLayout;
