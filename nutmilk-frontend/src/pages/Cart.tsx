import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";
import { useState } from "react";
import OrderService from "../services/order.service";
import AuthService from "../services/auth.service";

export default function Cart() {
  const { cart, update, remove, total } = useCart();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [ordering, setOrdering] = useState(false);

  const user = AuthService.getCurrentUser();

  async function handleCheckout() {
    if (!user) {
      alert("Vui lòng đăng nhập để thanh toán!");
      return;
    }
    if (!address || !phone) {
      alert("Vui lòng nhập đầy đủ Địa chỉ và Số điện thoại nhận hàng!");
      return;
    }

    if (!confirm("Xác nhận đặt hàng?")) return;

    setOrdering(true);
    try {
      await OrderService.createOrder({ shippingAddress: address, shippingPhone: phone });
      alert("Đặt hàng thành công! Chúng tôi sẽ sớm liên hệ với bạn.");
      window.location.href = "/dashboard"; // Redirect to dashboard or orders
    } catch (e) {
      console.error(e);
      alert("Lỗi khi đặt hàng! Vui lòng thử lại.");
    } finally {
      setOrdering(false);
    }
  }

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
                src={item.image || "/assets/products/default.png"}
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

        <div className="flex justify-between font-bold text-lg mb-6">
          <span>Tổng cộng</span>
          <span>{total.toLocaleString()}đ</span>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Địa chỉ nhận hàng</label>
            <input
              className="w-full border rounded-md px-3 py-2 mt-1"
              placeholder="Số nhà, đường, phường, quận..."
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input
              className="w-full border rounded-md px-3 py-2 mt-1"
              placeholder="09xxx..."
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={ordering}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-3 rounded-full font-bold"
        >
          {ordering ? "Đang xử lý..." : "Tiến hành thanh toán →"}
        </button>
      </div>
    </div>
  );
}
