import { useEffect, useState } from "react";
import { AdminInventoryService } from "../../../services/adminInventory.service";

export default function InventoryTable() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AdminInventoryService.getAll()
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  const totalProduct = items.length;
  const outOfStock = items.filter((i) => i.status === "OUT_OF_STOCK").length;
  const lowStock = items.filter((i) => i.status === "LOW_STOCK").length;

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-8 shadow-sm text-gray-500">
        Loading inventory...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ===== HEADER ===== */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <p className="mt-1 text-sm text-blue-100">
          Monitor stock levels and alerts
        </p>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Total Products" value={totalProduct} color="blue" />
        <StatCard title="Out of Stock" value={outOfStock} color="red" />
        <StatCard title="Low Stock" value={lowStock} color="yellow" />
      </div>

      {/* ===== TABLE ===== */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">
                Product ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">
                Product Name
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600">
                Stock
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((item) => (
              <tr key={item.productId} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-700">
                  #{item.productId}
                </td>
                <td className="px-6 py-4 font-medium">{item.productName}</td>
                <td className="px-6 py-4 text-right text-sm">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 text-center">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <span className="text-2xl">📦</span>
                    <span className="text-sm font-medium">
                      No inventory data
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===== SUB COMPONENTS ===== */

function StatusBadge({ status }: { status: string }) {
  if (status === "OUT_OF_STOCK" || status === "HET_HANG") {
    return (
      <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
        Out of Stock
      </span>
    );
  }

  if (status === "LOW_STOCK" || status === "SAP_HET") {
    return (
      <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
        Low Stock
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
      In Stock
    </span>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: "blue" | "red" | "yellow";
}) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-600",
    yellow: "bg-yellow-50 text-yellow-600",
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`mt-2 text-2xl font-bold ${colorMap[color]}`}>{value}</p>
    </div>
  );
}
