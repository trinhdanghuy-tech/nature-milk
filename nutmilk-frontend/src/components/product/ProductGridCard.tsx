import { Product } from "../../data/products";
import { useCart } from "../../hooks/useCart";

export default function ProductGridCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="group bg-white p-4 rounded-2xl border border-transparent hover:border-green-400/30 hover:shadow-xl transition">
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.badge}
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <button
          onClick={() => add({ ...product, qty: 1 })}
          className="absolute bottom-3 right-3 bg-white text-green-600 p-2 rounded-full shadow opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-green-500 hover:text-white"
        >
          🛒
        </button>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-start">
          <p className="font-bold text-lg">{product.name}</p>
          <span className="text-amber-400 text-sm font-bold">
            ⭐ {product.rating}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-1 mb-3">{product.desc}</p>

        <div className="flex items-center gap-2">
          <span className="text-green-600 font-bold text-lg">
            {product.price.toLocaleString()}đ
          </span>
          {product.oldPrice && (
            <span className="text-gray-400 text-sm line-through">
              {product.oldPrice.toLocaleString()}đ
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
