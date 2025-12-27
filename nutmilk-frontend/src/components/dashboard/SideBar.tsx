import { getUser } from "../../utils/auth";

type Props = {
  tab: string;
  setTab: (tab: any) => void;
};

export default function Sidebar({ tab, setTab }: Props) {
  const user = getUser();

  if (!user) return null;

  return (
    <aside className="w-64 bg-white rounded-2xl p-6 shadow-sm">
      {/* USER */}
      <div className="flex items-center gap-3 mb-8">
        <img
          src="/assets/avatar/avatar.jpg"
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{user.name}</p>
          <span className="text-xs text-green-600">
            Thành viên vàng
          </span>
        </div>
      </div>

      {/* MENU */}
      <nav className="space-y-2 text-sm">
        <button
          onClick={() => setTab("overview")}
          className={`w-full text-left px-4 py-2 rounded-lg ${
            tab === "overview"
              ? "bg-green-100 text-green-700"
              : "hover:bg-gray-100"
          }`}
        >
          📊 Bảng điều khiển
        </button>

        <button
          onClick={() => setTab("orders")}
          className={`w-full text-left px-4 py-2 rounded-lg ${
            tab === "orders"
              ? "bg-green-100 text-green-700"
              : "hover:bg-gray-100"
          }`}
        >
          📦 Đơn hàng của tôi
        </button>

        <button
          onClick={() => setTab("favorites")}
          className={`w-full text-left px-4 py-2 rounded-lg ${
            tab === "favorites"
              ? "bg-green-100 text-green-700"
              : "hover:bg-gray-100"
          }`}
        >
          ❤️ Yêu thích
        </button>
      </nav>
    </aside>
  );
}
