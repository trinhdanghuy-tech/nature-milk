export default function Overview() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        Xin chào, Đăng Huy 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stat title="Tổng đơn hàng" value="24" desc="+2 tháng này" />
        <Stat title="Chai tái chế" value="12" desc="Giảm 3kg CO₂" />
        <Stat title="Trạng thái" value="Đang hoạt động" desc="Giao tới 24/10" />
      </div>
    </>
  );
}

function Stat({
  title,
  value,
  desc,
}: {
  title: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
      <p className="text-xs text-green-600 mt-1">{desc}</p>
    </div>
  );
}
