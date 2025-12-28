import api from "./api";

export const AdminImportService = {
  create(data: any) {
    return api.post("/admin/import", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
