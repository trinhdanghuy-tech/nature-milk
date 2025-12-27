type Props = {
  category: string;
  setCategory: (c: string) => void;
  sort: string;
  setSort: (s: string) => void;
};

const categories = [
  { key: "all", label: "Tất cả" },
  { key: "almond", label: "Sữa Hạnh Nhân" },
  { key: "walnut", label: "Sữa Óc Chó" },
  { key: "oat", label: "Sữa Yến Mạch" },
  { key: "mix", label: "Mix Hạt" },
];

export default function ProductFilter({
  category,
  setCategory,
  sort,
  setSort,
}: Props) {
  return (
    <div className="sticky top-0 z-20 bg-[#f6f8f6]/95 backdrop-blur border-b px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        {/* CHIPS */}
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`px-5 h-9 rounded-lg text-sm font-bold whitespace-nowrap ${
                category === c.key
                  ? "bg-slate-900 text-white"
                  : "bg-white border hover:border-green-500 hover:text-green-600"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* SORT */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sắp xếp:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-transparent text-sm font-bold focus:outline-none cursor-pointer"
          >
            <option value="popular">Phổ biến nhất</option>
            <option value="price-asc">Giá: Thấp → Cao</option>
            <option value="price-desc">Giá: Cao → Thấp</option>
          </select>
        </div>
      </div>
    </div>
  );
}
