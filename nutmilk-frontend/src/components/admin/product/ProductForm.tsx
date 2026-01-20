import { useEffect, useState } from "react";
import { AdminProductService } from "../../../services/adminProduct.service";

type Props = {
  product?: any | null;
  categories?: any[];
  onSuccess: () => void;
};

export default function ProductForm({
  product,
  categories = [],
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  /* =======================
     EDIT MODE DATA POPULATION
  ======================= */
  useEffect(() => {
    if (product) {
      setName(product.name ?? "");
      setPrice(product.price ?? 0);
      setDescription(product.description ?? "");
      setCategoryId(product.category?.id || product.categoryId || null);

      if (product.image) {
        setPreview(`http://localhost:8080${product.image}`);
      }
    } else {
      resetForm();
    }
  }, [product]);

  const resetForm = () => {
    setName("");
    setPrice(0);
    setDescription("");
    setCategoryId(null);
    setImageFile(null);
    setPreview("");
  };

  /* =======================
     SUBMIT
  ======================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryId) {
      alert("Please select a category");
      return;
    }

    setLoading(true);

    let imageUrl = product?.image || "";

    try {
      /* ===== UPLOAD IMAGE ===== */
      if (imageFile) {
        setUploading(true);
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
          throw new Error("Image upload failed. Check the backend server.");
        }

        imageUrl = await res.text();
        setUploading(false);
      }

      /* ===== SAVE PRODUCT ===== */
      const payload = {
        name,
        price,
        description,
        categoryId: Number(categoryId),
        image: imageUrl,
      };

      if (product) {
        await AdminProductService.update(product.id, payload);
      } else {
        await AdminProductService.create(payload);
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Error processing request: " + err);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {product ? "Edit Product" : "New Product"}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT COLUMN: INPUTS */}
        <div className="space-y-5">
          {/* NAME */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
            <input
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Almond Milk"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* PRICE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price (VNĐ)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 transition"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                min={0}
                required
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 transition bg-white"
                value={categoryId ?? ""}
                onChange={(e) =>
                  setCategoryId(e.target.value ? Number(e.target.value) : null)
                }
              >
                <option value="">-- Select --</option>
                {categories.length === 0 ? (
                  <option disabled>No categories</option>
                ) : (
                  categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 transition h-32 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product details..."
            />
          </div>
        </div>

        {/* RIGHT COLUMN: IMAGE */}
        <div className="flex flex-col">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image</label>

          <div className="flex-1 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-6 hover:bg-gray-50 transition relative overflow-hidden group">

            {preview ? (
              <img
                src={preview}
                className="absolute inset-0 w-full h-full object-contain p-4"
                alt="Preview"
              />
            ) : (
              <div className="text-center text-gray-400">
                <span className="text-4xl block mb-2">📷</span>
                <span className="text-sm">Click to upload</span>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImageFile(file);
                if (file) setPreview(URL.createObjectURL(file));
              }}
            />

            {/* HOVER OVERLAY */}
            <div className={`absolute inset-0 bg-black/50 items-center justify-center text-white font-medium transition-opacity ${preview ? "opacity-0 group-hover:opacity-100 flex" : "hidden"}`}>
              Change Image
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onSuccess()} // Just close/cancel
              className="px-6 py-3 rounded-xl font-semibold text-gray-500 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                }`}
            >
              {loading ? (uploading ? "Uploading..." : "Saving...") : "Save Product"}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
