import { Link, useNavigate } from "react-router-dom";
import { getUser, logoutFake } from "../../utils/auth";
import { useCart } from "../../hooks/useCart";
import { useState } from "react";

export default function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const user = getUser();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-green-600 text-3xl">
            eco
          </span>
          <span className="font-bold text-lg">Nature Milk</span>
        </Link>

        {/* MENU */}
        <nav className="hidden md:flex gap-6 text-sm text-gray-700">
          <Link to="/">Trang chủ</Link>
          <Link to="/products">Sản phẩm</Link>
          <Link to="/">Lợi ích</Link>
          <Link to="/">Giới thiệu</Link>
          <Link to="/">Blog</Link>
        </nav>

        {/* ACTION */}
        <div className="flex items-center gap-5 relative">

          {/* CART */}
          <Link to="/cart" className="relative">
            <span className="material-symbols-outlined text-2xl">
              shopping_cart
            </span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {/* AUTH */}
          {!user ? (
            <>
              <Link to="/register" className="text-sm">
                Đăng ký
              </Link>
              <Link
                to="/login"
                className="bg-green-500 text-white px-4 py-2 rounded-full text-sm"
              >
                Đăng nhập
              </Link>
            </>
          ) : (
            <>
              {/* AVATAR */}
              <button
                onClick={() => setOpen(!open)}
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-green-500"
              >
                <img
                  src="/assets/avatar/avatar.jpg"
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </button>

              {/* DROPDOWN */}
              {open && (
                <div
                  className="absolute right-0 top-14 w-44 bg-white border rounded-xl shadow-lg"
                  onMouseLeave={() => setOpen(false)}
                >
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      logoutFake();
                      setOpen(false);
                      navigate("/");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
