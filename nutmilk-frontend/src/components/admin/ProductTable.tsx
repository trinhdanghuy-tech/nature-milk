import { adminProducts } from "../../data/adminProducts";

export default function ProductTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-6 py-4 text-left">Sản phẩm</th>
            <th className="px-6 py-4">Danh mục</th>
            <th className="px-6 py-4">Giá</th>
            <th className="px-6 py-4">Trạng thái</th>
            <th className="px-6 py-4 text-right">Tồn kho</th>
            <th className="px-6 py-4 text-right">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {adminProducts.map((p) => (
            <tr key={p.id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={p.image}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <span className="text-sm text-gray-500">{p.volume}</span>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs rounded bg-orange-100 text-orange-700">
                  {p.category}
                </span>
              </td>

              <td className="px-6 py-4">{p.price.toLocaleString()}đ</td>

              <td className="px-6 py-4">
                {p.status === "in" && (
                  <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                    Còn hàng
                  </span>
                )}
                {p.status === "out" && (
                  <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600">
                    Hết hàng
                  </span>
                )}
                {p.status === "low" && (
                  <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600">
                    Sắp hết
                  </span>
                )}
              </td>

              <td className="px-6 py-4 text-right">{p.stock}</td>

              <td className="px-6 py-4 text-right">
                ✏️ 🗑️
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
