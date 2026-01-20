import { useEffect, useState } from "react";
import { AdminProductService } from "../../../services/adminProduct.service";
import { AdminImportService } from "../../../services/adminImport.service";

type Row = {
  productId: number | "";
  importPrice: number;
  quantity: number;
};

export default function ImportForm({ onSuccess }: { onSuccess?: () => void }) {
  const [products, setProducts] = useState<any[]>([]);
  const [rows, setRows] = useState<Row[]>([
    { productId: "", importPrice: 0, quantity: 0 }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AdminProductService.getAll().then(res => setProducts(res.data));
  }, []);

  const addRow = () =>
    setRows([...rows, { productId: "", importPrice: 0, quantity: 0 }]);

  const removeRow = (index: number) =>
    setRows(rows.filter((_, i) => i !== index));

  const updateRow = (index: number, field: keyof Row, value: any) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
  };

  const total = rows.reduce(
    (sum, r) => sum + r.importPrice * r.quantity,
    0
  );

  const handleSubmit = async () => {
    if (rows.some(r => !r.productId || r.quantity <= 0 || r.importPrice <= 0)) {
      alert("Please fill all fields correctly");
      return;
    }

    setLoading(true);
    try {
      await AdminImportService.create({
        supplierId: 1, // Placeholder
        employeeId: 1, // Placeholder
        items: rows.map(r => ({
          productId: Number(r.productId),
          quantity: r.quantity,
          importPrice: r.importPrice
        }))
      });

      alert("Import successful");
      setRows([{ productId: "", importPrice: 0, quantity: 0 }]);
      onSuccess?.();
    } catch (e) {
      console.error(e);
      alert("Import failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 p-6 text-white shadow">
        <h2 className="text-2xl font-bold">Import Ticket</h2>
        <p className="text-sm opacity-90">
          Import products and update inventory
        </p>
      </div>

      {/* CARD */}
      <div className="rounded-2xl bg-white p-6 shadow-sm space-y-6">
        {/* TABLE */}
        <table className="w-full overflow-hidden rounded-lg border">
          <thead className="bg-gray-50 text-sm font-semibold">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-right">Import Price</th>
              <th className="p-3 text-right">Quantity</th>
              <th className="p-3 text-right">Total</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <select
                    className="w-full rounded border px-2 py-1"
                    value={r.productId}
                    onChange={e =>
                      updateRow(i, "productId", Number(e.target.value))
                    }
                  >
                    <option value="">-- Select Product --</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="p-3 text-right">
                  <input
                    type="number"
                    className="w-28 rounded border px-2 py-1 text-right"
                    value={r.importPrice}
                    onChange={e =>
                      updateRow(i, "importPrice", Number(e.target.value))
                    }
                  />
                </td>

                <td className="p-3 text-right">
                  <input
                    type="number"
                    className="w-20 rounded border px-2 py-1 text-right"
                    value={r.quantity}
                    onChange={e =>
                      updateRow(i, "quantity", Number(e.target.value))
                    }
                  />
                </td>

                <td className="p-3 text-right font-semibold text-green-700">
                  {(r.importPrice * r.quantity).toLocaleString()}đ
                </td>

                <td className="p-3 text-center">
                  {rows.length > 1 && (
                    <button
                      onClick={() => removeRow(i)}
                      className="text-sm font-medium text-red-500 hover:underline"
                    >
                      Delete
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
            + Add Row
          </button>

          <div className="text-lg font-bold">
            Total:{" "}
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
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Ticket"}
          </button>
        </div>
      </div>
    </div>
  );
}
