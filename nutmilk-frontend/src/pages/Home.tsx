import heroImg from "../assets/hero.png";
import almondImg from "../assets/products/almond.png";
import fiveMix from "../assets/products/five-mix.png";
import walnutImg from "../assets/products/oat.png";
import oatImg from "../assets/products/walnut.png";

import blog1 from "../assets/blog/blog1.png";
import blog2 from "../assets/blog/blog2.png";
import blog3 from "../assets/blog/blog3.png";

import { useCart } from "../hooks/useCart";

export default function Home() {
  const { add } = useCart();

  const products = [
    {
      id: "almond",
      img: almondImg,
      name: "Sữa Hạnh Nhân",
      price: 120000,
    },
    {
      id: "oat",
      img: oatImg,
      name: "Sữa Yến Mạch",
      price: 110000,
    },
    {
      id: "walnut",
      img: walnutImg,
      name: "Sữa Óc Chó",
      price: 135000,
    },
    {
      id: "mix",
      img: fiveMix,
      name: "Mix 5 Loại Hạt",
      price: 155000,
    },
  ];

  return (
    <div className="bg-[#f3f8f5] text-gray-900">
      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-6">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src={heroImg}
            alt="NutMilk"
            className="w-full h-[440px] object-cover"
          />

          {/* overlay xanh nhẹ */}
          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute inset-0 flex flex-col justify-center px-12 text-white max-w-xl">
            <span className="bg-green-500 text-xs font-semibold px-4 py-1 rounded-full w-fit mb-5">
              100% ORGANIC
            </span>

            <h1 className="text-[42px] font-bold leading-tight mb-4">
              Dinh Dưỡng Thuần Khiết <br /> Từ Thiên Nhiên
            </h1>

            <p className="text-base opacity-95 mb-8">
              Sữa hạt cao cấp – tốt cho sức khỏe – vị ngon tự nhiên.
            </p>

            <div className="flex gap-4">
              <button className="bg-green-500 hover:bg-green-600 transition text-white px-7 py-3 rounded-full font-semibold">
                Mua ngay
              </button>
              <button className="bg-white/30 hover:bg-white/40 transition px-7 py-3 rounded-full font-semibold">
                Xem thêm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LỢI ÍCH SỨC KHỎE ===== */}
      <section className="bg-[#f5faf5] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-[#111811] md:text-4xl">
              Lợi Ích Sức Khỏe
            </h2>
            <p className="mt-4 text-gray-600">
              Cam kết chất lượng từ những nguyên liệu tự nhiên nhất
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Benefit
              icon="spa"
              title="Thuần chay"
              desc="100% nguồn gốc thực vật"
            />
            <Benefit
              icon="water_drop"
              title="Không Lactose"
              desc="Tốt cho hệ tiêu hóa"
            />
            <Benefit
              icon="monitor_heart"
              title="Ít đường"
              desc="Vị ngọt thanh tự nhiên"
            />
            <Benefit icon="grain" title="Giàu chất xơ" desc="Hỗ trợ giảm cân" />
          </div>
        </div>
      </section>

      {/* ================= SẢN PHẨM ================= */}
      <section className="bg-[#eaf4ee]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-green-800">
              Sản phẩm nổi bật
            </h2>
            <span className="text-green-600 font-semibold cursor-pointer">
              Xem tất cả →
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-44 object-cover rounded-xl mb-4"
                />

                <h3 className="font-semibold text-base">{p.name}</h3>

                <p className="text-green-600 font-bold mt-1">
                  {p.price.toLocaleString()}đ
                </p>

                <button
                  onClick={() =>
                    add({
                      id: p.id,
                      name: p.name,
                      price: p.price, // ✅ GIÁ ĐÚNG
                      image: p.img,
                    })
                  }
                  className="mt-3 w-full bg-green-100 text-green-700 py-2 rounded-full text-sm hover:bg-green-200"
                >
                  Thêm
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIAL ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-bold text-center mb-14 text-green-800">
            Phản Hồi Của Khách Hàng Về Nature?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Testimonial
              text="Sữa rất ngon, uống mỗi ngày thấy người nhẹ và khỏe."
              name="Lan Anh"
            />
            <Testimonial
              text="Mùi vị tự nhiên, không ngấy, rất hợp cho người ăn chay."
              name="Minh Tuấn"
            />
          </div>
        </div>
      </section>

      {/* ================= BLOG ================= */}
      <section className="bg-[#eaf4ee]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-green-800">
              Góc Dinh Dưỡng
            </h2>
            <span className="text-green-600 font-semibold cursor-pointer">
              Đọc thêm →
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[blog1, blog2, blog3].map((img, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <img src={img} className="h-52 w-full object-cover" />
                <div className="p-5">
                  <h3 className="font-semibold mb-2">Kiến thức dinh dưỡng</h3>
                  <p className="text-gray-600 text-sm">
                    Giải pháp ăn uống lành mạnh mỗi ngày.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Benefit({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-gray-100 bg-white p-6 text-center transition-all hover:border-green-500/50 hover:shadow-lg">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f0f7f0] text-green-600 shadow-sm">
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>

      <div>
        <h3 className="text-lg font-bold text-[#111811]">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}

function Testimonial({ text, name }: { text: string; name: string }) {
  return (
    <div className="bg-[#f3f8f5] p-8 rounded-2xl">
      ⭐⭐⭐⭐⭐
      <p className="mt-4 text-base">{text}</p>
      <p className="mt-3 font-bold text-green-800">{name}</p>
    </div>
  );
}
