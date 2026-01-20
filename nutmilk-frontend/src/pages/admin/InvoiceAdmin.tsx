import { useEffect, useState } from "react";
import { AdminOrderService } from "../../services/adminOrder.service";
import AdminLayout from "../../components/layout/AdminLayout";

export default function InvoiceAdmin() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AdminOrderService.getAllOrders()
      .then((res) => {
        if (Array.isArray(res)) setInvoices(res);
        else setInvoices([]);
      })
      .catch((err) => {
        console.error(err);
        setInvoices([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await AdminOrderService.updateStatus(id, status);
      setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status } : inv));
    } catch (e) {
      console.error(e);
      alert("Lỗi cập nhật trạng thái");
    }
  }

  const renderStatus = (status: string, id: number) => {
    const color = status === "DELIVERED" ? "bg-green-100 text-green-700" :
      status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
        status === "CANCELLED" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700";

    return (
      <select
        className={`rounded-full px-2 py-1 text-xs border-none outline-none cursor-pointer ${color}`}
        value={status}
        onChange={(e) => handleStatusChange(id, e.target.value)}
      >
        <option value="PENDING">PENDING</option>
        <option value="CONFIRMED">CONFIRMED</option>
        <option value="SHIPPED">SHIPPED</option>
        <option value="DELIVERED">DELIVERED</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>
    );
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("vi-VN");
    } catch {
      return "Invalid date";
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold">Hoá đơn</h1>
          <p className="text-sm text-gray-500">
            Danh sách hoá đơn bán hàng
          </p>
        </div>

        <div className="rounded-xl bg-white shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Mã HĐ</th>
                  <th className="px-4 py-3 text-left">Khách hàng</th>
                  <th className="px-4 py-3 text-center">Ngày</th>
                  <th className="px-4 py-3 text-center">Tổng tiền</th>
                  <th className="px-4 py-3 text-center">Trạng thái</th>
                  <th className="px-4 py-3 text-right">Hành động</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {invoices.map((inv) => (
                  <tr key={inv?.id || Math.random()} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">#{inv?.id}</td>
                    <td className="px-4 py-3">{inv?.user?.fullName || inv?.user?.username || "Guest"}</td>
                    <td className="px-4 py-3 text-center">{formatDate(inv?.createdAt)}</td>
                    <td className="px-4 py-3 text-center">
                      {inv?.totalPrice?.toLocaleString()}đ
                    </td>
                    <td className="px-4 py-3 text-center">
                      {inv && renderStatus(inv.status, inv.id)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-xs text-gray-500">
                        {inv?.orderDetails?.length || 0} sản phẩm
                      </span>
                    </td>
                  </tr>
                ))}
                {invoices.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      Chưa có hoá đơn nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
