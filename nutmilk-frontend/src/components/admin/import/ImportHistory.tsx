import { useEffect, useState } from "react";
import { AdminImportService } from "../../../services/adminImport.service";
import { AdminStaffService } from "../../../services/adminStaff.service";

export default function ImportHistory() {
    const [imports, setImports] = useState<any[]>([]);
    const [staffMap, setStaffMap] = useState<Record<number, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [importRes, staffRes] = await Promise.all([
                AdminImportService.getHistory(),
                AdminStaffService.getAllStaff()
            ]);

            if (Array.isArray(importRes)) setImports(importRes);

            if (Array.isArray(staffRes)) {
                const map: Record<number, string> = {};
                staffRes.forEach((s: any) => map[s.id] = s.fullName || s.username);
                setStaffMap(map);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4">Lịch sử nhập kho</h3>
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3 text-left">Mã phiếu</th>
                            <th className="px-4 py-3 text-left">Ngày nhập</th>
                            <th className="px-4 py-3 text-left">Nhân viên nhập</th>
                            <th className="px-4 py-3 text-right">NCC (ID)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {imports.map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium">#{item.id}</td>
                                <td className="px-4 py-3">
                                    {new Date(item.importDate).toLocaleString("vi-VN")}
                                </td>
                                <td className="px-4 py-3">
                                    {item.employeeId ? (
                                        <span className="inline-flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                                {staffMap[item.employeeId]?.charAt(0)}
                                            </div>
                                            {staffMap[item.employeeId] || `ID: ${item.employeeId}`}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">Unknown</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-right text-gray-500">
                                    #{item.supplierId}
                                </td>
                            </tr>
                        ))}
                        {imports.length === 0 && !loading && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">Chưa có phiếu nhập nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
