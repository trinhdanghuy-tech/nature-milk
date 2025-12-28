
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function InventoryCharts({ data }: { data: any[] }) {
  const statusData = [
    {
      name: "Còn hàng",
      value: data.filter(i => i.trangThai === "CON_HANG").length,
      color: "#22c55e",
    },
    {
      name: "Sắp hết",
      value: data.filter(i => i.trangThai === "SAP_HET").length,
      color: "#f97316",
    },
    {
      name: "Hết hàng",
      value: data.filter(i => i.trangThai === "HET_HANG").length,
      color: "#ef4444",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* BAR CHART */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="font-semibold mb-4">
          Tồn kho theo sản phẩm
        </h3>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <XAxis
              dataKey="tenSanPham"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="soLuongTon"
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PIE CHART */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="font-semibold mb-4">
          Trạng thái kho
        </h3>

        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
            >
              {statusData.map((e, i) => (
                <Cell key={i} fill={e.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex justify-center gap-4 mt-4 text-sm">
          {statusData.map(s => (
            <div key={s.name} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: s.color }}
              />
              {s.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
