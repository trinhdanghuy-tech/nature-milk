import api from "./api";

export const AdminProductService = {
  getAll() {
    return api.get("/admin/products");
  },

  getById(id: number) {
    return api.get(`/admin/products/${id}`);
  },

  create(data: any) {
    return api.post("/admin/products", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  update(id: number, data: any) {
    return api.put(`/admin/products/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  delete(id: number) {
    return api.delete(`/admin/products/${id}`);
  },
};
