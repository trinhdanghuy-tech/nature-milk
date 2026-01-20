import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import AuthService from "../services/auth.service";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: ""
  });

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    try {
      await AuthService.register(formData);
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Đăng ký thất bại! Có thể tên đăng nhập hoặc email đã tồn tại.");
    }
  }

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

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          placeholder="Họ và tên"
          className="w-full rounded-full bg-gray-100 px-5 py-3 outline-none"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
        <input
          placeholder="Tên đăng nhập"
          className="w-full rounded-full bg-gray-100 px-5 py-3 outline-none"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          placeholder="Email"
          type="email"
          className="w-full rounded-full bg-gray-100 px-5 py-3 outline-none"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full rounded-full bg-gray-100 px-5 py-3 outline-none"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold">
          Đăng ký ngay
        </button>

        {/* OAUTH2 */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Hoặc tiếp tục với</span>
          </div>
        </div>

        <div className="flex gap-4">
          <a
            href="http://localhost:8080/oauth2/authorization/google"
            className="flex-1 flex items-center justify-center gap-2 border rounded-full py-2 hover:bg-gray-50 bg-white shadow-sm"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            <span className="text-sm font-medium">Google</span>
          </a>
          <a
            href="http://localhost:8080/oauth2/authorization/facebook"
            className="flex-1 flex items-center justify-center gap-2 border rounded-full py-2 hover:bg-gray-50 bg-white shadow-sm"
          >
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="Facebook" />
            <span className="text-sm font-medium">Facebook</span>
          </a>
        </div>

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
