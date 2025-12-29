import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import RequireAuth from "./routes/RequireAuth";

import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";

// ADMIN
import Dashboard from "./pages/admin/Dashboard";
import ImportAdmin from "./pages/admin/ImportAdmin";
import InventoryAdmin from "./pages/admin/InventoryAdmin";
import ProductAdmin from "./pages/admin/ProductAdmin";
import InvoiceAdmin from "./pages/admin/InvoiceAdmin";
import StaffAdmin from "./pages/admin/StaffAdmin";

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
      <Route path="/admin/inventory" element={<InventoryAdmin />} />
      <Route path="/admin/import" element={<ImportAdmin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/invoices" element={<InvoiceAdmin />} />
      <Route path="/admin/staff" element={<StaffAdmin />} />
      {/* ===== AUTH ===== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
