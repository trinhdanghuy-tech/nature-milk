export default function ProductPageHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white px-6 py-5 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kho Sản Phẩm</h1>
        <p className="mt-1 text-sm text-gray-500">
          Quản lý danh sách các loại sữa hạt và tình trạng kho
        </p>
      </div>

      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5
               text-sm font-semibold text-white shadow-md
               hover:bg-green-500 active:scale-95"
      >
        <span className="material-symbols-outlined text-[20px]">add</span>;
        + Thêm sản phẩm
      </button>
    </div>
  );
}


