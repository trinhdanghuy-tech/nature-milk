import AdminNavItem from "./AdminNavItem";

export default function AdminSidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-white">
      {/* LOGO */}
      <div className="h-16 flex items-center gap-3 px-6 border-b">
        <div className="flex size-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
          🌿
        </div>
        <span className="font-bold text-lg">Nature Milk Admin</span>
      </div>

      {/* ADMIN INFO */}
      <div className="p-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-100">
          <img
            src="/assets/avatar/avatar.jpg"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold">Đăng Huy</p>
            <span className="text-xs text-gray-500">Quản trị viên</span>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav className="px-4 space-y-1">
        <AdminNavItem to="/admin/dashboard" label="Tổng quan" icon="📊" />
        <AdminNavItem to="/admin/products" label="Sản phẩm" icon="📦" />
        <AdminNavItem to="/admin/inventory" label="Kho hàng" icon="🏬" />
        <AdminNavItem to="/admin/import" label="Nhập kho" icon="📥" />
        <AdminNavItem to="/admin/invoices" label="Hoá đơn" icon="🧾" />
        <AdminNavItem to="/admin/staff" label="Nhân viên" icon="👤" />
      </nav>

      {/* LOGOUT */}
      <div className="mt-auto p-4 border-t">
        <button className="w-full flex items-center gap-2 text-sm text-gray-600 hover:text-red-500">
          ⎋ Đăng xuất
        </button>
      </div>
    </aside>
  );
}
