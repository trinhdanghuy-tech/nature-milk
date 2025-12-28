type Props = {
  product: any;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ProductRow({ product, onEdit, onDelete }: Props) {
  const imageSrc = product.hinhAnh
    ? `http://localhost:8080${product.hinhAnh}`
    : "/placeholder.png";

  return (
    <tr className="border-t">
      {/* SẢN PHẨM (ẢNH + TÊN) */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={imageSrc}
            onError={e => {
              (e.currentTarget as HTMLImageElement).src = "/placeholder.png";
            }}
            className="h-12 w-12 rounded-lg object-cover border bg-gray-50"
            alt={product.tenSanPham}
          />
          <div>
            <p className="font-medium">{product.tenSanPham}</p>
            {product.moTa && (
              <p className="text-xs text-gray-500 line-clamp-1">
                {product.moTa}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* DANH MỤC */}
      <td className="px-6 py-4">
        {product.tenDanhMuc || (
          <span className="text-gray-400">—</span>
        )}
      </td>

      {/* GIÁ */}
      <td className="px-6 py-4">
        {Number(product.giaBan).toLocaleString()}đ
      </td>

      {/* TRẠNG THÁI */}
      <td className="px-6 py-4 text-center">
        <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
          Còn hàng
        </span>
      </td>

      {/* TỒN KHO */}
      <td className="px-6 py-4 text-right">
        {product.soLuongTon ?? 0}
      </td>

      {/* HÀNH ĐỘNG */}
      <td className="px-6 py-4 text-right space-x-2">
        <button
          onClick={onEdit}
          className="rounded-md border border-blue-500 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
        >
          Sửa
        </button>
        <button
          onClick={onDelete}
          className="rounded-md border border-red-500 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
        >
          Xóa
        </button>
      </td>
    </tr>
  );
}
