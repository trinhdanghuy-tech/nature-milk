import { useEffect, useState } from "react";
import { AdminProductService } from "../../../services/adminProduct.service";
import Modal from "../common/Modal";
import ProductForm from "./ProductForm";
import ProductRow from "./ProductRow";
import ProductToolbar from "./ProductToolbar";

export default function ProductTable() {
  const [products, setProducts] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // toolbar state
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [stockStatus, setStockStatus] = useState("");

  /* =======================
     LOAD PRODUCTS
  ======================= */
  const loadProducts = () => {
    AdminProductService.getAll().then(res => setProducts(res.data));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* =======================
     FILTER LOGIC (FRONTEND)
     🔥 FIX: dùng maDanhMuc
  ======================= */
  const filteredProducts = products.filter(p => {
    const matchKeyword =
      p.tenSanPham?.toLowerCase().includes(keyword.toLowerCase());

    const matchCategory =
      categoryId === "" || p.maDanhMuc === categoryId;

    const matchStock =
      stockStatus === "" ||
      (stockStatus === "out" && p.soLuongTon === 0) ||
      (stockStatus === "low" && p.soLuongTon > 0 && p.soLuongTon < 5) ||
      (stockStatus === "in" && p.soLuongTon >= 5);

    return matchKeyword && matchCategory && matchStock;
  });

  return (
    <div className="space-y-6">
      {/* ❌ ĐÃ XÓA HEADER + NÚT THÊM SẢN PHẨM (ĐỂ Ở PAGE CHA) */}

      {/* TOOLBAR */}
      <ProductToolbar
        keyword={keyword}
        onKeywordChange={setKeyword}
        categoryId={categoryId}
        onCategoryChange={setCategoryId}
        stockStatus={stockStatus}
        onStockStatusChange={setStockStatus}
      />

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs">Sản phẩm</th>
              <th className="px-6 py-4 text-left text-xs">Danh mục</th>
              <th className="px-6 py-4 text-left text-xs">Giá</th>
              <th className="px-6 py-4 text-center text-xs">Trạng thái</th>
              <th className="px-6 py-4 text-right text-xs">Tồn kho</th>
              <th className="px-6 py-4 text-right text-xs">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => (
              <ProductRow
                key={p.maSanPham}   // 🔥 dùng đúng key
                product={p}
                onEdit={() => {
                  setEditingProduct(p);
                  setOpenModal(true);
                }}
                onDelete={() => {
                  if (confirm("Xóa sản phẩm này?")) {
                    AdminProductService.delete(p.maSanPham).then(loadProducts);
                  }
                }}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ProductForm
          product={editingProduct}
          onSuccess={() => {
            setOpenModal(false);
            loadProducts(); // 🔥 reload sau khi lưu
          }}
        />
      </Modal>
    </div>
  );
}
