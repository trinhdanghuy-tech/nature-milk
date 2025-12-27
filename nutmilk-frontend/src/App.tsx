import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import RequireAuth from "./routes/RequireAuth";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";

// ADMIN
import ProductAdmin from "./pages/ProductAdmin";

export default function App() {
  return (
    <Routes>
      {/* ===== USER LAYOUT ===== */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />

        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <UserDashboard />
            </RequireAuth>
          }
        />
      </Route>

      {/* ===== ADMIN ===== */}
      <Route path="/admin/products" element={<ProductAdmin />} />

      {/* ===== AUTH ===== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
