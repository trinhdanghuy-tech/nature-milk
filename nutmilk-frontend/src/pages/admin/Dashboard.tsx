import { useEffect, useState } from "react";
import InventoryCharts from "../../components/admin/dashboard/InventoryCharts";
import AdminLayout from "../../components/layout/AdminLayout";
import { AdminInventoryService } from "../../services/adminInventory.service";
import { AdminProductService } from "../../services/adminProduct.service";

export default function Dashboard() {
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [lowStock, setLowStock] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const products = await AdminProductService.getAll();
    const inventory = await AdminInventoryService.getAll();
    const inventoryRes = await AdminInventoryService.getAll();

    setInventory(inventoryRes.data);
    setTotalProduct(products.data.length);

    let sum = 0;
    const low: any[] = [];

    inventory.data.forEach((i: any) => {
      sum += i.soLuongTon;
      if (i.soLuongTon > 0 && i.soLuongTon < 10) {
        low.push(i);
      }
    });

    setTotalStock(sum);
    setLowStock(low);
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Tổng quan hệ thống</h1>
        <p className="text-gray-500">
          Theo dõi tình trạng kho và hoạt động kinh doanh
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Sản phẩm"
          value={totalProduct}
          color="green"
          icon="📦"
        />
        <StatCard title="Tồn kho" value={totalStock} color="blue" icon="🏬" />
        <StatCard
          title="Sắp hết hàng"
          value={lowStock.length}
          color="red"
          icon="⚠️"
        />
        <StatCard title="Nhập kho hôm nay" value="—" color="purple" icon="📥" />
      </div>

      <div className="mb-10">
        <InventoryCharts data={inventory} />
      </div>

      {/* LOW STOCK TABLE */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="px-6 py-4 border-b font-semibold">
          Sản phẩm sắp hết hàng
        </div>

        {lowStock.length === 0 ? (
          <div className="p-6 text-gray-500">Không có sản phẩm sắp hết 🎉</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 text-sm">
              <tr>
                <th className="px-6 py-3 text-left">Mã SP</th>
                <th className="px-6 py-3 text-left">Tên sản phẩm</th>
                <th className="px-6 py-3 text-right">Tồn kho</th>
              </tr>
            </thead>
            <tbody>
              {lowStock.map((i: any) => (
                <tr key={i.maSanPham} className="border-t">
                  <td className="px-6 py-3">{i.maSanPham}</td>
                  <td className="px-6 py-3 font-medium">{i.tenSanPham}</td>
                  <td className="px-6 py-3 text-right text-red-600 font-semibold">
                    {i.soLuongTon}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}

/* ================= COMPONENT ================= */

function StatCard({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: number | string;
  color: "green" | "blue" | "red" | "purple";
  icon: string;
}) {
  const colorMap: any = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="bg-white rounded-xl border p-6 flex items-center gap-4">
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-lg text-xl ${colorMap[color]}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
