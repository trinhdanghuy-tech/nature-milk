export default function InvoiceAdmin() {
  const invoices = [
    {
      id: "HD001",
      customer: "Nguyễn Văn A",
      date: "29/12/2025",
      total: 450000,
      status: "PAID",
    },
    {
      id: "HD002",
      customer: "Trần Thị B",
      date: "29/12/2025",
      total: 120000,
      status: "PENDING",
    },
    {
      id: "HD003",
      customer: "Lê Minh C",
      date: "28/12/2025",
      total: 980000,
      status: "CANCEL",
    },
  ];

  const renderStatus = (status: string) => {
    switch (status) {
      case "PAID":
        return (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
            Đã thanh toán
          </span>
        );
      case "PENDING":
        return (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">
            Chờ xử lý
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">
            Đã huỷ
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Hoá đơn</h1>
        <p className="text-sm text-gray-500">
          Danh sách hoá đơn bán hàng (mock data)
        </p>
      </div>

      <div className="rounded-xl bg-white shadow">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Mã HĐ</th>
              <th className="px-4 py-3 text-left">Khách hàng</th>
              <th className="px-4 py-3">Ngày</th>
              <th className="px-4 py-3">Tổng tiền</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{inv.id}</td>
                <td className="px-4 py-3">{inv.customer}</td>
                <td className="px-4 py-3 text-center">{inv.date}</td>
                <td className="px-4 py-3 text-center">
                  {inv.total.toLocaleString()}đ
                </td>
                <td className="px-4 py-3 text-center">
                  {renderStatus(inv.status)}
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="rounded border px-3 py-1 text-xs hover:bg-gray-100">
                    Xem
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
