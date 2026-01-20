import { useState } from "react";
import ImportForm from "../../components/admin/import/ImportForm";
import ImportHistory from "../../components/admin/import/ImportHistory";
import AdminLayout from "../../components/layout/AdminLayout";

export default function ImportAdmin() {
  const [tab, setTab] = useState<"create" | "history">("create");

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* TABS */}
        <div className="flex items-center gap-4 border-b px-6">
          <button
            onClick={() => setTab("create")}
            className={`py-3 text-sm font-medium border-b-2 transition ${tab === "create"
                ? "border-green-600 text-green-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            Nhập kho mới
          </button>
          <button
            onClick={() => setTab("history")}
            className={`py-3 text-sm font-medium border-b-2 transition ${tab === "history"
                ? "border-green-600 text-green-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            Lịch sử nhập
          </button>
        </div>

        <div className="p-6">
          {tab === "create" ? (
            <ImportForm onSuccess={() => setTab("history")} />
          ) : (
            <ImportHistory />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
