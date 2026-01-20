import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { AdminStaffService } from "../../services/adminStaff.service";

export default function StaffAdmin() {
  const [staffs, setStaffs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await AdminStaffService.getAllStaff();
      if (Array.isArray(res)) {
        setStaffs(res);
      } else {
        console.warn("API returned non-array for staff list:", res);
        setStaffs([]);
      }
    } catch (e) {
      console.error(e);
      setStaffs([]);
    } finally {
      setLoading(false);
    }
  };

  const getName = (s: any) => s?.fullName || s?.username || "Unknown";
  const getInitial = (s: any) => {
    const name = getName(s);
    return name.charAt(0).toUpperCase();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Nhân viên</h1>
            <p className="text-sm text-gray-500">
              Quản lý danh sách nhân viên
            </p>
          </div>

          <button className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 transition">
            + Thêm nhân viên
          </button>
        </div>

        <div className="rounded-xl bg-white shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">ID</th>
                  <th className="px-6 py-4 text-left">Tên</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-center">Chức vụ</th>
                  <th className="px-6 py-4 text-center">SĐT</th>
                  <th className="px-6 py-4 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {staffs.map((s) => (
                  <tr key={s?.id || Math.random()} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-500">#{s?.id}</td>
                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold uppercase text-xs">
                        {getInitial(s)}
                      </div>
                      {getName(s)}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{s?.email}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${s?.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                          s?.role === 'MANAGER' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                        }`}>
                        {s?.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {s?.phone || "—"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 font-medium">Sửa</button>
                      <button className="text-red-600 hover:text-red-900 font-medium">Khoá</button>
                    </td>
                  </tr>
                ))}
                {staffs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      Chưa có nhân viên nào.
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
