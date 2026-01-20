import { useEffect, useState } from "react";
import InventoryCharts from "../../components/admin/dashboard/InventoryCharts";
import AdminLayout from "../../components/layout/AdminLayout";
import { AdminInventoryService } from "../../services/adminInventory.service";
import { AdminProductService } from "../../services/adminProduct.service";

/* ================= PAGE ================= */

export default function Dashboard() {
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [lowStock, setLowStock] = useState<any[]>([]);
  const [outOfStock, setOutOfStock] = useState(0);
  const [inventory, setInventory] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const productsRes = await AdminProductService.getAll();
    const inventoryRes = await AdminInventoryService.getAll();

    const products = productsRes.data;
    const inv = inventoryRes.data;

    setInventory(inv);
    setTotalProduct(products.length);

    let sum = 0;
    let low: any[] = [];
    let out = 0;

    inv.forEach((i: any) => {
      sum += i.quantity;
      if (i.quantity === 0) out++;
      if (i.quantity > 0 && i.quantity < 10) low.push(i);
    });

    setTotalStock(sum);
    setLowStock(low);
    setOutOfStock(out);
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">System Overview</h1>
        <p className="text-gray-500">
          Monitor inventory and business performance
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
        <StatCard title="Products" value={totalProduct} color="green" icon="📦" />
        <StatCard title="Stock" value={totalStock} color="blue" icon="🏬" />
        <StatCard title="Low Stock" value={lowStock.length} color="yellow" icon="⚠️" />
        <StatCard title="Out of Stock" value={outOfStock} color="red" icon="❌" />
        <StatCard title="Imports Today" value="—" color="purple" icon="📥" />
      </div>

      {/* CHART */}
      <div className="mb-10">
        <InventoryCharts data={inventory} />
      </div>

      {/* GRID BOTTOM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LOW STOCK TABLE */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="px-6 py-4 border-b font-semibold">
            Low Stock Alert
          </div>

          {lowStock.length === 0 ? (
            <div className="p-6 text-gray-500">
              No low stock alerts 🎉
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 text-sm">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Product</th>
                  <th className="px-6 py-3 text-right">Stock</th>
                </tr>
              </thead>
              <tbody>
                {lowStock.map((i: any) => (
                  <tr key={i.productId} className="border-t">
                    <td className="px-6 py-3">#{i.productId}</td>
                    <td className="px-6 py-3 font-medium">{i.productName}</td>
                    <td className="px-6 py-3 text-right text-red-600 font-semibold">
                      {i.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* RECENT ACTIVITIES */}
        <RecentActivities />
      </div>
    </AdminLayout>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: number | string;
  color: "green" | "blue" | "yellow" | "red" | "purple";
  icon: string;
}) {
  const colorMap: any = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
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

/* ================= RECENT ================= */

function RecentActivities() {
  const logs = [
    "📥 Imported 20 units",
    "✏️ Updated Almond Milk price",
    "📦 Added new product",
    "🧾 Created sales order",
  ];

  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="px-6 py-4 border-b font-semibold">
        Recent Activities
      </div>
      <ul className="divide-y text-sm">
        {logs.map((l, i) => (
          <li key={i} className="px-6 py-3 text-gray-600">
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}
