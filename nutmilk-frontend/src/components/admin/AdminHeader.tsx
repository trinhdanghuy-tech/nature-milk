export default function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Trang chủ / <span className="text-gray-900 font-medium">Quản lý</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
          🔔
        </button>
      </div>
    </header>
  );
}
