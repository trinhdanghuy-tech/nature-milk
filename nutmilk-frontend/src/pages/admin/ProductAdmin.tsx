import { useEffect, useState } from "react";
import ProductTable from "../../components/admin/product/ProductTable";
import ProductForm from "../../components/admin/product/ProductForm";
import Modal from "../../components/admin/common/Modal";
import { AdminProductService } from "../../services/adminProduct.service";
import { AdminCategoryService } from "../../services/adminCategory.service";

export default function ProductAdmin() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  /* =======================
     LOAD DATA
  ======================= */
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await AdminProductService.getAll();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    const res = await AdminCategoryService.getAll();
    setCategories(res.data);
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  /* =======================
     HANDLERS
  ======================= */
  const handleCreate = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-4">
      {/* HEADER – CHỈ 1 NÚT THÊM */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Kho Sản Phẩm</h1>
          <p className="text-sm text-gray-500">
            Quản lý danh sách sản phẩm và tồn kho
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
        >
          + Thêm sản phẩm
        </button>
      </div>

      {/* TABLE */}
      <ProductTable
        products={products}
        categories={categories}
        loading={loading}
        onEdit={handleEdit}
      />

      {/* MODAL */}
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <ProductForm
            product={selectedProduct}
            onSuccess={() => {
              handleCloseModal();
              loadProducts(); // 🔥 reload bảng
            }}
          />
        </Modal>
      )}
    </div>
  );
}
