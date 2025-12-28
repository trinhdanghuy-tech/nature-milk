import { useEffect, useState } from "react";
import { AdminProductService } from "../../../services/adminProduct.service";
import { AdminImportService } from "../../../services/adminImport.service";

type Row = {
  maSanPham: number | "";
  giaNhap: number;
  soLuong: number;
};

export default function ImportForm({ onSuccess }: { onSuccess?: () => void }) {
  const [products, setProducts] = useState<any[]>([]);
  const [rows, setRows] = useState<Row[]>([
    { maSanPham: "", giaNhap: 0, soLuong: 0 }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AdminProductService.getAll().then(res => setProducts(res.data));
  }, []);

  const addRow = () =>
    setRows([...rows, { maSanPham: "", giaNhap: 0, soLuong: 0 }]);

  const removeRow = (index: number) =>
    setRows(rows.filter((_, i) => i !== index));

  const updateRow = (index: number, field: keyof Row, value: any) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const total = rows.reduce(
    (sum, r) => sum + r.giaNhap * r.soLuong,
    0
  );

  const handleSubmit = async () => {
    if (rows.some(r => !r.maSanPham || r.soLuong <= 0 || r.giaNhap <= 0)) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);
    try {
      await AdminImportService.create({
        maNhaCungCap: 1,
        maNhanVien: 1,
        items: rows.map(r => ({
          maSanPham: r.maSanPham,
          soLuongNhap: r.soLuong,
          giaNhap: r.giaNhap
        }))
      });

      alert("Nhập kho thành công");
      setRows([{ maSanPham: "", giaNhap: 0, soLuong: 0 }]);
      onSuccess?.();
    } catch {
      alert("Có lỗi khi nhập kho");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 p-6 text-white shadow">
        <h2 className="text-2xl font-bold">Phiếu nhập kho</h2>
        <p className="text-sm opacity-90">
          Nhập hàng và cập nhật tồn kho hệ thống
        </p>
      </div>

      {/* CARD */}
      <div className="rounded-2xl bg-white p-6 shadow-sm space-y-6">
        {/* TABLE */}
        <table className="w-full overflow-hidden rounded-lg border">
          <thead className="bg-gray-50 text-sm font-semibold">
            <tr>
              <th className="p-3 text-left">Sản phẩm</th>
              <th className="p-3 text-right">Giá nhập</th>
              <th className="p-3 text-right">Số lượng</th>
              <th className="p-3 text-right">Thành tiền</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <select
                    className="w-full rounded border px-2 py-1"
                    value={r.maSanPham}
                    onChange={e =>
                      updateRow(i, "maSanPham", Number(e.target.value))
                    }
                  >
                    <option value="">-- Chọn sản phẩm --</option>
                    {products.map(p => (
                      <option key={p.maSanPham} value={p.maSanPham}>
                        {p.tenSanPham}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="p-3 text-right">
                  <input
                    type="number"
                    className="w-28 rounded border px-2 py-1 text-right"
                    value={r.giaNhap}
                    onChange={e =>
                      updateRow(i, "giaNhap", Number(e.target.value))
                    }
                  />
                </td>

                <td className="p-3 text-right">
                  <input
                    type="number"
                    className="w-20 rounded border px-2 py-1 text-right"
                    value={r.soLuong}
                    onChange={e =>
                      updateRow(i, "soLuong", Number(e.target.value))
                    }
                  />
                </td>

                <td className="p-3 text-right font-semibold text-green-700">
                  {(r.giaNhap * r.soLuong).toLocaleString()}đ
                </td>

                <td className="p-3 text-center">
                  {rows.length > 1 && (
                    <button
                      onClick={() => removeRow(i)}
                      className="text-sm font-medium text-red-500 hover:underline"
                    >
                      Xoá
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ACTIONS */}
        <div className="flex items-center justify-between">
          <button
            onClick={addRow}
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            + Thêm dòng
          </button>

          <div className="text-lg font-bold">
            Tổng tiền:{" "}
            <span className="text-green-700">
              {total.toLocaleString()}đ
            </span>
          </div>
        </div>

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            {loading ? "Đang lưu..." : "Lưu phiếu nhập"}
          </button>
        </div>
      </div>
    </div>
  );
}
