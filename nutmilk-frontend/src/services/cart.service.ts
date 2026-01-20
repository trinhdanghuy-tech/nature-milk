import api from "./api";

const getCart = async () => {
    const response = await api.get("/cart");
    return response.data;
};

const addToCart = async (productId: number, quantity: number) => {
    const response = await api.post("/cart/add", { productId, quantity });
    return response.data;
};

const removeFromCart = async (cartItemId: number) => {
    const response = await api.delete(`/cart/remove/${cartItemId}`);
    return response.data;
};

const CartService = {
    getCart,
    addToCart,
    removeFromCart,
};

export default CartService;
