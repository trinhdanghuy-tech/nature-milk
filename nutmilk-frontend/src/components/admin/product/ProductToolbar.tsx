import { useEffect, useState } from "react";
import { AdminCategoryService } from "../../../services/adminCategory.service";

type Props = {
  keyword: string;
  onKeywordChange: (v: string) => void;
  categoryId: number | "";
  onCategoryChange: (v: number | "") => void;
  stockStatus: string;
  onStockStatusChange: (v: string) => void;
};

export default function ProductToolbar({
  keyword,
  onKeywordChange,
  categoryId,
  onCategoryChange,
  stockStatus,
  onStockStatusChange,
}: Props) {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    AdminCategoryService.getAll().then((res) => setCategories(res.data));
  }, []);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm lg:flex-row lg:items-center">
      {/* SEARCH */}
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
        <input
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="Tìm theo tên sản phẩm..."
          className="h-10 w-full rounded-lg bg-gray-50 pl-9 pr-3 text-sm focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap items-center gap-2">
        {/* CATEGORY */}
        <select
          value={categoryId}
          onChange={(e) =>
            onCategoryChange(e.target.value ? Number(e.target.value) : "")
          }
          className="h-10 rounded-lg border bg-white px-3 text-sm"
        >
          <option value="">Danh mục</option>
          {categories.map((c) => (
            <option key={c.maDanhMuc} value={c.maDanhMuc}>
              {c.tenDanhMuc}
            </option>
          ))}
        </select>

        {/* STOCK STATUS */}
        <select
          value={stockStatus}
          onChange={(e) => onStockStatusChange(e.target.value)}
          className="h-10 rounded-lg border bg-white px-3 text-sm"
        >
          <option value="">Trạng thái</option>
          <option value="in">Còn hàng</option>
          <option value="low">Sắp hết</option>
          <option value="out">Hết hàng</option>
        </select>
      </div>
    </div>
  );
}
