import { useEffect, useState } from "react";
import UserService, { UserProfile } from "../../services/user.service";

export default function Overview() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  // Edit Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: ""
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await UserService.getProfile();
      setProfile(res.data);
      setFormData({
        fullName: res.data.fullName || "",
        phone: res.data.phone || "",
        address: res.data.address || ""
      });
    } catch (error) {
      console.error("Failed to load profile", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("phone", formData.phone);
      data.append("address", formData.address);
      if (avatarFile) {
        data.append("avatar", avatarFile);
      }

      await UserService.updateProfile(data);
      alert("Cập nhật thành công!");
      setEditing(false);
      loadProfile();
    } catch (error) {
      console.error(error);
      alert("Lỗi khi cập nhật!");
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Không tải được thông tin</div>;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Xin chào, {profile.fullName || profile.username || "Bạn"} 👋
        </h1>
        <button
          onClick={() => setEditing(!editing)}
          className="text-green-600 hover:text-green-700 font-medium"
        >
          {editing ? "Hủy" : "Chỉnh sửa"}
        </button>
      </div>

      {!editing ? (
        // VIEW MODE
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <img
              src={profile.avatar ? `http://localhost:8080${profile.avatar}` : "/assets/user-placeholder.png"}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-100"
              onError={(e) => e.currentTarget.src = "https://ui-avatars.com/api/?name=" + (profile.fullName || "User")}
            />
            <div>
              <h2 className="text-xl font-semibold">{profile.fullName || "Chưa cập nhật tên"}</h2>
              <p className="text-gray-500">{profile.email}</p>
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium mt-2">
                {profile.role || "Thành viên"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
            <div>
              <label className="text-sm text-gray-500 block mb-1">Số điện thoại</label>
              <p className="font-medium">{profile.phone || "---"}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-1">Địa chỉ</label>
              <p className="font-medium">{profile.address || "---"}</p>
            </div>
          </div>

          {/* Stats (Giữ lại phần cũ nếu muốn) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 mt-6 border-t">
            <Stat title="Tổng đơn hàng" value="0" desc="Sắp có" />
            <Stat title="Chai tái chế" value="0" desc="Sắp có" />
            <Stat title="Trạng thái" value="Đang hoạt động" desc="Verified" />
          </div>
        </div>
      ) : (
        // EDIT MODE
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={avatarFile ? URL.createObjectURL(avatarFile) : (profile.avatar ? `http://localhost:8080${profile.avatar}` : "/assets/user-placeholder.png")}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-100"
                onError={(e) => e.currentTarget.src = "https://ui-avatars.com/api/?name=" + (profile.fullName || "User")}
              />
              <label className="absolute bottom-0 right-0 bg-white border shadow p-1 rounded-full cursor-pointer hover:bg-gray-50">
                <span className="material-symbols-outlined text-sm">edit</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
              </label>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-2">Ảnh đại diện (Max 5MB)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Họ và tên</label>
              <input
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Số điện thoại</label>
              <input
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Địa chỉ</label>
              <input
                className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700"
            >
              Lưu thay đổi
            </button>
            <button
              type="button"
              onClick={() => { setEditing(false); setAvatarFile(null); }}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200"
            >
              Hủy
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function Stat({ title, value, desc }: { title: string; value: string; desc: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
      <p className="text-xs text-green-600 mt-1">{desc}</p>
    </div>
  );
}
