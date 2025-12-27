import bg from "../../assets/login-bg.png";
import { Link } from "react-router-dom";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen overflow-hidden grid grid-cols-10">
      
      {/* LEFT - IMAGE (6/10) */}
      <div className="col-span-6 relative hidden lg:block">
        <img
          src={bg}
          alt="Nature Milk"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute bottom-10 left-10 text-white max-w-md">
          <h2 className="text-3xl font-bold leading-tight">
            Vị ngon tinh khiết <br /> từ thiên nhiên.
          </h2>
          <p className="mt-4 text-sm opacity-90">
            Khám phá bộ sưu tập sữa hạt hữu cơ, mang lại sức khỏe vàng cho
            bạn và gia đình mỗi ngày.
          </p>
        </div>
      </div>

      {/* RIGHT - FORM (4/10) */}
      <div className="col-span-10 lg:col-span-4 flex items-center justify-center bg-[#fbfbf8]">
        <div className="w-full max-w-md px-8">
          
          <Link
            to="/"
            className="mb-6 inline-block text-sm text-gray-500 hover:text-green-600"
          >
            ← Trang chủ
          </Link>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            {children}
          </div>

          <div className="mt-6 flex justify-between text-xs text-gray-400">
            <span>Điều khoản sử dụng</span>
            <span>Chính sách bảo mật</span>
          </div>
        </div>
      </div>
    </div>
  );
}
