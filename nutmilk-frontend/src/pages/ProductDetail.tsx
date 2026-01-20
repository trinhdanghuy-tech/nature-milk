import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductService from "../services/product.service";
import { useCart } from "../hooks/useCart";
import { useToast } from "../components/common/ToastContext";
import AuthService from "../services/auth.service";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { add } = useCart();
    const { showToast } = useToast();

    useEffect(() => {
        if (!id) return;
        ProductService.getProductById(Number(id))
            .then(setProduct)
            .catch((err) => {
                console.error(err);
                showToast("Không tìm thấy sản phẩm", "error");
                navigate("/products");
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="p-10 text-center">Đang tải...</div>;
    if (!product) return null;

    const handleAddToCart = () => {
        if (!AuthService.getCurrentUser()) {
            showToast("Vui lòng đăng nhập để mua hàng", "info");
            navigate("/login");
            return;
        }
        add({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image || "/assets/products/default.png"
        });
    };

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <button onClick={() => navigate(-1)} className="mb-6 text-gray-500 hover:text-green-600">
                    ← Quay lại
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* IMAGE */}
                    <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm">
                        <img
                            src={product.image || "/assets/products/default.png"}
                            className="w-full h-full object-cover"
                            alt={product.name}
                        />
                    </div>

                    {/* INFO */}
                    <div>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            {product.category?.name || "Organic"}
                        </span>

                        <h1 className="mt-4 text-4xl font-bold text-gray-900">{product.name}</h1>

                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                            <span className="text-gray-500 text-sm">(50 đánh giá)</span>
                        </div>

                        <p className="mt-6 text-2xl font-bold text-green-600">
                            {product.price?.toLocaleString()}đ
                        </p>

                        <div className="mt-6 border-t border-b py-4">
                            <p className="text-gray-600 leading-relaxed">
                                {product.description || "Sữa hạt dinh dưỡng nguyên chất, tốt cho sức khỏe mọi lứa tuổi."}
                            </p>
                        </div>

                        {/* ACTIONS */}
                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95"
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </div>

                        {/* GUARANTEE */}
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🌱</span>
                                <span className="text-sm font-medium">100% Tự nhiên</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">⚡</span>
                                <span className="text-sm font-medium">Giao nhanh 2h</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🛡️</span>
                                <span className="text-sm font-medium">Bảo hành chất lượng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
