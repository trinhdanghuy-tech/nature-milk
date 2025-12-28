import { useEffect, useState } from "react";
import { AdminCategoryService } from "../../../services/adminCategory.service";
import { AdminProductService } from "../../../services/adminProduct.service";

type Props = {
  product?: any;
  onSuccess?: () => void;
};

export default function ProductForm({ product, onSuccess }: Props) {
  const [tenSanPham, setTenSanPham] = useState("");
  const [giaBan, setGiaBan] = useState<number>(0);
  const [moTa, setMoTa] = useState("");
  const [maDanhMuc, setMaDanhMuc] = useState<string>("");

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔥 IMAGE STATE
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  /* =======================
     LOAD DANH MỤC
  ======================= */
  useEffect(() => {
    AdminCategoryService.getAll().then((res) => {
      setCategories(res.data);
    });
  }, []);

  /* =======================
     ĐỔ DATA KHI EDIT
  ======================= */
  useEffect(() => {
    if (product) {
      setTenSanPham(product.tenSanPham ?? "");
      setGiaBan(product.giaBan ?? 0);
      setMoTa(product.moTa ?? "");
      setMaDanhMuc(product.maDanhMuc != null ? String(product.maDanhMuc) : "");

      // 🔥 preview ảnh cũ
      if (product.hinhAnh) {
        setPreview(`http://localhost:8080${product.hinhAnh}`);
      }
    } else {
      setTenSanPham("");
      setGiaBan(0);
      setMoTa("");
      setMaDanhMuc("");
      setImageFile(null);
      setPreview("");
    }
  }, [product]);

  /* =======================
     SUBMIT
  ======================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!maDanhMuc) {
      alert("Vui lòng chọn danh mục");
      return;
    }

    setLoading(true);

    let imageUrl = product?.hinhAnh || "";

    try {
      /* ========= UPLOAD IMAGE ========= */
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const res = await fetch(
          "http://localhost:8080/api/admin/upload/product-image",
          {
            method: "POST",
            body: formData,
          }
        );

        imageUrl = await res.text();
      }

      /* ========= SAVE PRODUCT ========= */
      const payload = {
        tenSanPham,
        giaBan,
        moTa,
        maDanhMuc: Number(maDanhMuc),
        hinhAnh: imageUrl,
      };

      if (product) {
        await AdminProductService.update(product.maSanPham, payload);
      } else {
        await AdminProductService.create(payload);
      }

      alert("Lưu thành công");
      onSuccess?.();
    } catch (error: any) {
      console.error("SAVE PRODUCT ERROR:", error?.response?.data || error);
      alert(error?.response?.data?.message || "Có lỗi xảy ra khi lưu sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">
        {product ? "Sửa sản phẩm" : "Thêm sản phẩm"}
      </h2>

      {/* TÊN */}
      <div>
        <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
        <input
          className="w-full rounded-md border px-3 py-2 text-sm"
          value={tenSanPham}
          onChange={(e) => setTenSanPham(e.target.value)}
          required
        />
      </div>

      {/* GIÁ */}
      <div>
        <label className="block text-sm font-medium mb-1">Giá bán</label>
        <input
          type="number"
          className="w-full rounded-md border px-3 py-2 text-sm"
          value={giaBan}
          onChange={(e) => setGiaBan(Number(e.target.value))}
          min={0}
          required
        />
      </div>

      {/* MÔ TẢ */}
      <div>
        <label className="block text-sm font-medium mb-1">Mô tả</label>
        <textarea
          className="w-full rounded-md border px-3 py-2 text-sm"
          value={moTa}
          onChange={(e) => setMoTa(e.target.value)}
          rows={3}
        />
      </div>

      {/* DANH MỤC */}
      <div>
        <label className="block text-sm font-medium mb-1">Danh mục</label>
        <select
          className="w-full rounded-md border px-3 py-2 text-sm"
          value={maDanhMuc}
          onChange={(e) => setMaDanhMuc(e.target.value)}
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((c) => (
            <option key={c.maDanhMuc} value={String(c.maDanhMuc)}>
              {c.tenDanhMuc}
            </option>
          ))}
        </select>
      </div>

      {/* 🔥 UPLOAD IMAGE */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Hình ảnh sản phẩm
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setImageFile(file);
            if (file) setPreview(URL.createObjectURL(file));
          }}
        />

        {preview && (
          <img
            src={preview}
            className="mt-2 h-24 w-24 rounded-lg object-cover border"
          />
        )}
      </div>

      {/* ACTION */}
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Đang lưu..." : "Lưu"}
        </button>
      </div>
    </form>
  );
}
