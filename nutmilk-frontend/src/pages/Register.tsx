import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";

export default function Register() {
  return (
    <AuthLayout>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-green-500 text-xl material-symbols-outlined">
          eco
        </span>
        <span className="font-semibold">Nature Milk</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Đăng ký tài khoản</h1>
      <p className="text-sm text-gray-500 mb-6">
        Sống xanh – Uống sạch – Bắt đầu hành trình sức khỏe cùng Nature Milk
      </p>

      <form className="space-y-4">
        <input
          placeholder="Họ và tên"
          className="w-full rounded-full bg-gray-100 px-5 py-3 outline-none"
        />
        <input
          placeholder="Email"
          className="w-full rounded-full bg-gray-100 px-5 py-3 outline-none"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full rounded-full bg-gray-100 px-5 py-3 outline-none"
        />

        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold">
          Đăng ký ngay
        </button>

        <p className="text-center text-sm mt-4">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-green-600 font-medium">
            Đăng nhập
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
