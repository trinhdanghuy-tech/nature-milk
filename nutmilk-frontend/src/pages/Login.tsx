import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import AuthService from "../services/auth.service";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      await AuthService.login({ username, password });

      // Get user role
      const currentUser = AuthService.getCurrentUser();
      const role = currentUser?.role; // Adjust based on actual string/object

      // Redirect based on role
      if (role === "ADMIN" || role?.name === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error(error);
      alert("Đăng nhập thất bại! Kiểm tra lại thông tin.");
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
      <h1 className="text-2xl font-bold mb-2">Chào mừng trở lại!</h1>

      <form onSubmit={handleLogin} className="space-y-4 mt-6">
        <input
          type="text"
          placeholder="Tên đăng nhập"
          className="w-full rounded-full bg-gray-100 px-4 py-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full rounded-full bg-gray-100 px-4 py-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-500 text-white py-3 rounded-full">
          Đăng nhập
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
      </form>

      <div className="mt-6 text-center text-sm">
        Chưa có tài khoản?{" "}
        <Link to="/register" className="text-green-600 font-medium">
          Đăng ký ngay
        </Link>
      </div>
    </AuthLayout>
  );
}
