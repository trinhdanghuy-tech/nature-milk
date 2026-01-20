import ProductRow from "./ProductRow";

type Props = {
  products: any[];
  onEdit: (product: any) => void;
  onDelete: (id: number) => void;
};

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <table className="min-w-full divide-y">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs">Product</th>
            <th className="px-6 py-4 text-left text-xs">Category</th>
            <th className="px-6 py-4 text-left text-xs">Price</th>
            <th className="px-6 py-4 text-center text-xs">Status</th>
            <th className="px-6 py-4 text-right text-xs">Inventory</th>
            <th className="px-6 py-4 text-right text-xs">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((p) => (
            <ProductRow
              key={p.id}
              product={p}
              onEdit={() => onEdit(p)}
              onDelete={() => onDelete(p.id)}
            />
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
