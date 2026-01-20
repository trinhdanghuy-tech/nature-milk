import api from "./api";

const getAllStaff = async () => {
    const response = await api.get("/admin/staff");
    return response.data;
};

export const AdminStaffService = {
    getAllStaff
};
