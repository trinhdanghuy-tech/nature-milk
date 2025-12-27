export default function Footer() {
  return (
    <footer className="bg-[#f3f8f5] border-t border-green-100">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-green-600 text-3xl">
              eco
            </span>
            <span className="font-bold text-lg text-[#111811]">
              Nature Milk
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Thương hiệu sữa hạt thuần chay, cam kết mang đến
            nguồn dinh dưỡng tự nhiên và an toàn.
          </p>
        </div>

        {/* PRODUCTS */}
        <div>
          <h4 className="font-bold text-[#111811] mb-4">
            Sản phẩm
          </h4>
          <ul className="space-y-2 text-gray-600">
            <li>Sữa Hạnh Nhân</li>
            <li>Sữa Óc Chó</li>
            <li>Sữa Yến Mạch</li>
            <li>Combo Dinh Dưỡng</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="font-bold text-[#111811] mb-4">
            Hỗ trợ
          </h4>
          <ul className="space-y-2 text-gray-600">
            <li>Hướng dẫn mua hàng</li>
            <li>Chính sách đổi trả</li>
            <li>Chính sách bảo mật</li>
            <li>Liên hệ</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h4 className="font-bold text-[#111811] mb-4">
            Nhận ưu đãi
          </h4>
          <p className="text-gray-600 mb-4">
            Đăng ký email để nhận thông tin khuyến mãi mới nhất
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex-1 rounded-l-lg border border-green-200 px-4 py-2 outline-none focus:border-green-400"
            />
            <button className="rounded-r-lg bg-green-500 hover:bg-green-600 px-4 text-white">
              →
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-green-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-2">
          <span>© 2024 Nature Milk. All rights reserved.</span>
          <div className="flex gap-4">
            <span>Điều khoản</span>
            <span>Bảo mật</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
