export default function StaffAdmin() {
  const staffs = [
    {
      id: "NV001",
      name: "Đăng Huy",
      role: "Quản trị viên",
      phone: "0123 456 789",
      status: "ACTIVE",
    },
    {
      id: "NV002",
      name: "Nguyễn An",
      role: "Nhân viên kho",
      phone: "0987 654 321",
      status: "ACTIVE",
    },
    {
      id: "NV003",
      name: "Trần Bình",
      role: "Bán hàng",
      phone: "0909 888 777",
      status: "INACTIVE",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Nhân viên</h1>
          <p className="text-sm text-gray-500">
            Quản lý danh sách nhân viên (mock)
          </p>
        </div>

        <button className="rounded-md bg-green-600 px-4 py-2 text-sm text-white">
          + Thêm nhân viên
        </button>
      </div>

      <div className="rounded-xl bg-white shadow">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Mã NV</th>
              <th className="px-4 py-3 text-left">Tên</th>
              <th className="px-4 py-3">Chức vụ</th>
              <th className="px-4 py-3">SĐT</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {staffs.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{s.id}</td>
                <td className="px-4 py-3">{s.name}</td>
                <td className="px-4 py-3 text-center">{s.role}</td>
                <td className="px-4 py-3 text-center">{s.phone}</td>
                <td className="px-4 py-3 text-center">
                  {s.status === "ACTIVE" ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                      Hoạt động
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600">
                      Nghỉ
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="mr-2 rounded border px-3 py-1 text-xs hover:bg-gray-100">
                    Sửa
                  </button>
                  <button className="rounded border border-red-400 px-3 py-1 text-xs text-red-600 hover:bg-red-50">
                    Khoá
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
