import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import { loginFake } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    loginFake("user@email.com");

    navigate("/dashboard", { replace: true });
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
          type="email"
          placeholder="Email"
          className="w-full rounded-full bg-gray-100 px-4 py-3"
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full rounded-full bg-gray-100 px-4 py-3"
        />

        <button className="w-full bg-green-500 text-white py-3 rounded-full">
          Đăng nhập
        </button>
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
