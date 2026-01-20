import { Link } from "react-router-dom";
import type { Product } from "../../data/products";
import { useCart } from "../../hooks/useCart";

export default function ProductGridCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="group bg-white p-4 rounded-2xl border border-transparent hover:border-green-400/30 hover:shadow-xl transition relative">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
          {product.badge && (
            <span className="absolute top-3 left-3 z-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.badge}
            </span>
          )}

          <img
            src={product.image || "/assets/products/default.png"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          add({
            id: String(product.id),
            name: product.name,
            price: product.price,
            image: product.image || "/assets/products/default.png"
          });
        }}
        className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded-full shadow-md hover:bg-green-500 hover:text-white transition z-20"
      >
        <span className="material-symbols-outlined text-xl">shopping_cart</span>
      </button>

      <div className="mt-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-bold text-lg hover:text-green-600 transition">{product.name}</h3>
        </Link>

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
  );
}
