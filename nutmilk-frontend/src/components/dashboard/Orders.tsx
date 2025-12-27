export default function Orders() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        Đơn hàng của tôi
      </h1>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-4 text-left">Mã đơn</th>
              <th>Ngày</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4">#NM-8832</td>
              <td>12/10/2023</td>
              <td>1.080.000đ</td>
              <td className="text-green-600">Đang giao</td>
            </tr>
            <tr className="border-t">
              <td className="p-4">#NM-8420</td>
              <td>28/09/2023</td>
              <td>780.000đ</td>
              <td className="text-gray-500">Hoàn thành</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
