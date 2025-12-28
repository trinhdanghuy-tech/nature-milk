import api from "./api";

export const AdminCategoryService = {
  getAll() {
    return api.get("/categories");
  },
};
