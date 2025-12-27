import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, update, remove, total } = useCart();

  if (!cart.length) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Giỏ hàng trống</h2>
        <Link to="/" className="text-green-600">
          ← Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      
      {/* LEFT - CART LIST */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-2xl font-bold">
          Giỏ hàng của bạn
        </h1>

        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-xl flex justify-between items-center shadow-sm"
          >
            <div className="flex gap-4 items-center">
              <img
                src={item.image}
                className="w-20 h-20 rounded-lg object-cover"
              />

              <div>
                <h3 className="font-semibold">{item.name}</h3>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => update(item.id, item.qty - 1)}
                    className="px-3 py-1 border rounded"
                  >
                    −
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() => update(item.id, item.qty + 1)}
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                {(item.qty * item.price).toLocaleString()}đ
              </p>

              <button
                onClick={() => remove(item.id)}
                className="text-red-500 text-sm mt-2"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}

        <Link to="/" className="text-green-600 inline-block mt-4">
          ← Tiếp tục mua sắm
        </Link>
      </div>

      {/* RIGHT - SUMMARY */}
      <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
        <h3 className="text-xl font-bold mb-4">Tổng đơn hàng</h3>

        <div className="flex justify-between text-sm mb-2">
          <span>Tạm tính</span>
          <span>{total.toLocaleString()}đ</span>
        </div>

        <div className="flex justify-between text-sm mb-2">
          <span>Phí vận chuyển</span>
          <span className="text-green-600">Miễn phí</span>
        </div>

        <div className="border-t my-3" />

        <div className="flex justify-between font-bold text-lg">
          <span>Tổng cộng</span>
          <span>{total.toLocaleString()}đ</span>
        </div>

        <button
          onClick={() => alert("Fake checkout – sau nối backend")}
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full"
        >
          Tiến hành thanh toán →
        </button>
      </div>
    </div>
  );
}
