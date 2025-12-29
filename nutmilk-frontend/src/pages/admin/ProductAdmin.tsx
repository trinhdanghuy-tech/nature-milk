import { useEffect, useState } from "react";
import Modal from "../../components/admin/common/Modal";
import ProductForm from "../../components/admin/product/ProductForm";
import ProductTable from "../../components/admin/product/ProductTable";
import { AdminCategoryService } from "../../services/adminCategory.service";
import { AdminProductService } from "../../services/adminProduct.service";

export default function ProductAdmin() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  /* =======================
     LOAD PRODUCTS
  ======================= */
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await AdminProductService.getAll();
      setProducts(res.data || []);
    } catch (err) {
      console.error("LOAD PRODUCTS ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     LOAD CATEGORIES
  ======================= */
  const loadCategories = async () => {
    try {
      setLoadingCategory(true);
      const res = await AdminCategoryService.getAll();
      setCategories(res.data || []);
    } catch (err) {
      console.error("LOAD CATEGORIES ERROR:", err);
      setCategories([]);
    } finally {
      setLoadingCategory(false);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  /* =======================
     HANDLERS
  ======================= */
  const handleCreate = () => {
    // ❗ chặn mở modal khi chưa có danh mục
    if (!loadingCategory && categories.length === 0) {
      alert("Chưa có danh mục, vui lòng tạo danh mục trước");
      return;
    }

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
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Kho Sản Phẩm</h1>
          <p className="text-sm text-gray-500">
            Quản lý danh sách sản phẩm và tồn kho
          </p>
        </div>

        <button
          onClick={handleCreate}
          disabled={loadingCategory}
          className="rounded-md bg-green-600 px-4 py-2 text-sm text-white disabled:opacity-60"
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
            categories={categories} // ✅ LUÔN LÀ MẢNG
            onSuccess={() => {
              handleCloseModal();
              loadProducts();
            }}
          />
        </Modal>
      )}
    </div>
  );
}
