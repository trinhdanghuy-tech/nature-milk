type Props = {
  product: any;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ProductRow({ product, onEdit, onDelete }: Props) {
  const imageSrc = product.image
    ? `http://localhost:8080${product.image}`
    : "/placeholder.png";

  return (
    <tr className="border-t">
      {/* PRODUCT (IMAGE + NAME) */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={imageSrc}
            onError={e => {
              (e.currentTarget as HTMLImageElement).src = "/placeholder.png";
            }}
            className="h-12 w-12 rounded-lg object-cover border bg-gray-50"
            alt={product.name}
          />
          <div>
            <p className="font-medium">{product.name}</p>
            {product.description && (
              <p className="text-xs text-gray-500 line-clamp-1">
                {product.description}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* CATEGORY */}
      <td className="px-6 py-4">
        {product.category?.name || (
          <span className="text-gray-400">—</span>
        )}
      </td>

      {/* PRICE */}
      <td className="px-6 py-4">
        {Number(product.price).toLocaleString()}đ
      </td>

      {/* STATUS */}
      <td className="px-6 py-4 text-center">
        <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
          Available
        </span>
      </td>

      {/* INVENTORY - Placeholder as backend Product entity doesn't strictly carry quantity now */}
      <td className="px-6 py-4 text-right">
        {/* You might want to fetch inventory or just show placeholder */}
        <span className="text-gray-400 text-xs">N/A</span>
      </td>

      {/* ACTIONS */}
      <td className="px-6 py-4 text-right space-x-2">
        <button
          onClick={onEdit}
          className="rounded-md border border-blue-500 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="rounded-md border border-red-500 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
