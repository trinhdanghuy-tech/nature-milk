import api from "./api";

const create = async (data: any) => {
  const response = await api.post("/admin/imports", data);
  return response.data;
};

const getHistory = async () => {
  const response = await api.get("/admin/imports");
  return response.data;
}

export const AdminImportService = {
  create,
  getHistory
};
