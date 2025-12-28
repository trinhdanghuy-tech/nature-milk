export default function InventoryAlertTable({ data }: { data: any[] }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm">
      <div className="border-b px-6 py-4 font-semibold">
        Cảnh báo tồn kho
      </div>

      <table className="w-full">
        <thead className="bg-gray-50 text-sm">
          <tr>
            <th className="px-6 py-3 text-left">Sản phẩm</th>
            <th className="px-6 py-3 text-right">Tồn kho</th>
            <th className="px-6 py-3 text-center">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.maSanPham} className="border-t">
              <td className="px-6 py-3">{item.tenSanPham}</td>
              <td className="px-6 py-3 text-right">
                {item.soLuongTon}
              </td>
              <td className="px-6 py-3 text-center">
                {item.trangThai === "HET_HANG" && (
                  <span className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
                    Hết hàng
                  </span>
                )}
                {item.trangThai === "SAP_HET" && (
                  <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-600">
                    Sắp hết
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
