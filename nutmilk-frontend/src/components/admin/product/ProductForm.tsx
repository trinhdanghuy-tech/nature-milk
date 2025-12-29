import { useEffect, useState } from "react";
import { AdminProductService } from "../../../services/adminProduct.service";

type Props = {
  product?: any | null;
  categories?: any[];
  onSuccess: () => void;
};

export default function ProductForm({
  product,
  categories = [], // 🔥 CỐ ĐỊNH KHÔNG BAO GIỜ undefined
  onSuccess,
}: Props) {
  const [tenSanPham, setTenSanPham] = useState("");
  const [giaBan, setGiaBan] = useState<number>(0);
  const [moTa, setMoTa] = useState("");
  const [maDanhMuc, setMaDanhMuc] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  /* =======================
     ĐỔ DATA KHI EDIT
  ======================= */
  useEffect(() => {
    if (product) {
      setTenSanPham(product.tenSanPham ?? "");
      setGiaBan(product.giaBan ?? 0);
      setMoTa(product.moTa ?? "");
      setMaDanhMuc(product.maDanhMuc ?? null);

      if (product.hinhAnh) {
        setPreview(`http://localhost:8080${product.hinhAnh}`);
      }
    } else {
      setTenSanPham("");
      setGiaBan(0);
      setMoTa("");
      setMaDanhMuc(null);
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
      /* ===== UPLOAD IMAGE ===== */
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

        if (!res.ok) {
          throw new Error("Upload ảnh thất bại");
        }

        imageUrl = await res.text();
      }

      /* ===== SAVE PRODUCT ===== */
      const payload = {
        tenSanPham,
        giaBan,
        moTa,
        maDanhMuc: Number(maDanhMuc), // ✅ ép kiểu chắc chắn
        hinhAnh: imageUrl,
      };

      if (product) {
        await AdminProductService.update(product.maSanPham, payload);
      } else {
        await AdminProductService.create(payload);
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi lưu sản phẩm");
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
        <label className="block text-sm mb-1">Tên sản phẩm</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={tenSanPham}
          onChange={(e) => setTenSanPham(e.target.value)}
          required
        />
      </div>

      {/* GIÁ */}
      <div>
        <label className="block text-sm mb-1">Giá bán</label>
        <input
          type="number"
          className="w-full border rounded px-3 py-2"
          value={giaBan}
          onChange={(e) => setGiaBan(Number(e.target.value))}
          min={0}
          required
        />
      </div>

      {/* MÔ TẢ */}
      <div>
        <label className="block text-sm mb-1">Mô tả</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          value={moTa}
          onChange={(e) => setMoTa(e.target.value)}
        />
      </div>

      {/* DANH MỤC */}
      <div>
        <label className="block text-sm mb-1">Danh mục</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={maDanhMuc ?? ""}
          onChange={(e) =>
            setMaDanhMuc(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">-- Chọn danh mục --</option>

          {categories.length === 0 ? (
            <option disabled>Chưa có danh mục</option>
          ) : (
            categories.map((c) => (
              <option key={c.maDanhMuc} value={c.maDanhMuc}>
                {c.tenDanhMuc}
              </option>
            ))
          )}
        </select>
      </div>

      {/* IMAGE */}
      <div>
        <label className="block text-sm mb-1">Hình ảnh</label>
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
            className="mt-2 h-24 w-24 object-cover rounded border"
          />
        )}
      </div>

      {/* ACTION */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Đang lưu..." : "Lưu"}
        </button>
      </div>
    </form>
  );
}
