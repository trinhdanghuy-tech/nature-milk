import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#f6f8f6]">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        {/* HEADER */}
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Trang chủ / <span className="text-gray-900">Quản lý sản phẩm</span>
          </div>
          <button className="w-9 h-9 rounded-full bg-gray-100">
            🔔
          </button>
        </header>

        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
