export default function ProductCard() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <img
        src="/product.jpg"
        className="h-48 w-full object-cover rounded-lg"
      />

      <h3 className="font-semibold mt-4">Sữa Hạnh Nhân</h3>
      <p className="text-sm text-gray-500">500ml</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-green-500 font-bold">120.000đ</span>
        <button className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
          Thêm
        </button>
      </div>
    </div>
  );
}
