import api from "./api";

const getAllOrders = async () => {
    const response = await api.get("/admin/orders");
    return response.data;
};

const updateStatus = async (orderId: number, status: string) => {
    const response = await api.put(`/admin/orders/${orderId}/status`, null, {
        params: { status }
    });
    return response.data;
};

export const AdminOrderService = {
    getAllOrders,
    updateStatus
};
