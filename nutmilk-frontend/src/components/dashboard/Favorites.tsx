export default function Favorites() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        Sản phẩm yêu thích
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-2xl shadow-sm"
          >
            <img
              src="./assets/products/almond.png"
              className="rounded-xl mb-3"
            />
            <p className="font-semibold">Sữa hạt cao cấp</p>
            <p className="text-green-600 font-bold">120.000đ</p>
          </div>
        ))}
      </div>
    </>
  );
}
