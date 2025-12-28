import api from "./api";

export const AdminInventoryService = {
  getAll() {
    // KHỚP CHÍNH XÁC backend: /api/admin/inventory
    return api.get("/admin/inventory");
  },
};
