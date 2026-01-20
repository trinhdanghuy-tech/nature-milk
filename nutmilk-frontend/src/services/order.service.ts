import api from "./api";

const createOrder = async (orderData: { shippingAddress: string; shippingPhone: string }) => {
    const response = await api.post("/orders", orderData);
    return response.data;
};

const OrderService = {
    createOrder,
};

export default OrderService;
