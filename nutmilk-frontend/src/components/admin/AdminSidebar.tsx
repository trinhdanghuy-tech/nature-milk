export default function AdminSidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-white">
      <div className="h-16 flex items-center gap-3 px-6 border-b">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
          <span className="material-symbols-outlined">eco</span>
        </div>
        <span className="font-bold">Nature Milk Admin</span>
      </div>

      <div className="p-4 space-y-1">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-100">
          <img
            src="/assets/avatar/avatar.jpg"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">Đăng Huy</p>
            <span className="text-xs text-gray-500">Quản trị viên</span>
          </div>
        </div>

        <nav className="mt-4 space-y-1">
          <SidebarItem label="Tổng quan" />
          <SidebarItem label="Sản phẩm" active />
          <SidebarItem label="Đơn hàng" />
          <SidebarItem label="Khách hàng" />
          <SidebarItem label="Cài đặt" />
        </nav>
      </div>

      <div className="mt-auto p-4 border-t">
        <button className="w-full flex items-center gap-2 text-sm text-gray-600">
          ⎋ Đăng xuất
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${
        active
          ? "bg-green-100 text-green-700 font-medium"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {label}
    </div>
  );
}
