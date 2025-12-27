import AdminLayout from "../components/admin/AdminLayout";
import ProductTable from "../components/admin/ProductTable";

export default function ProductAdmin() {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Kho Sản Phẩm</h1>
          <p className="text-gray-500">
            Quản lý danh sách các loại sữa hạt và tình trạng kho.
          </p>
        </div>

        <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
          + Thêm Sản Phẩm
        </button>
      </div>

      <ProductTable />
    </AdminLayout>
  );
}
