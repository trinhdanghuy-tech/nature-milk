export default function ProductHero() {
  return (
    <section className="px-6 py-8">
      <div
        className="relative min-h-[420px] rounded-2xl bg-cover bg-center overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(21,33,17,.45), rgba(21,33,17,.65)), url(https://lh3.googleusercontent.com/aida-public/AB6AXuB6NtmRWXPqga5qwi1pl5rZRWuQTRJmTQE4Jj_g9a87SBzxNxj0PCTRcrXrxQPfuB-Z4olgIuB1PtDsVIs8gEF_3EnZl19hub7fzrQ66FcOdtR6hDmSnsuVRo-vNk5u9eATivvWiCKi0xzDsoD5rTdtg_i_fIHIfpPMTWn-aYbQG2dii9YHt2evZFCaLEXUk_GEUbOeq0AGzzrbHHHYjcdMtLIpcZKwTyBqhxLCjVgDjCVlsHt-LJLX6IFdgWLgiR83eKJ72ftQSpQ)",
        }}
      >
        <div className="text-center max-w-2xl px-6">
          <span className="inline-block text-xs font-bold tracking-wider uppercase bg-white/10 text-green-400 px-3 py-1 rounded-full border border-white/20 mb-4">
            100% ORGANIC
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-black mb-4">
            Tinh túy từ thiên nhiên
          </h1>
          <p className="text-slate-100 mb-6">
            Khám phá bộ sưu tập sữa hạt nguyên chất, không chất bảo quản,
            mang lại nguồn dinh dưỡng thuần khiết cho gia đình bạn.
          </p>
          <div className="flex justify-center gap-3">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl">
              Xem Khuyến Mãi
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl border border-white/30">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
