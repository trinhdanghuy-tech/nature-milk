import api from "./api";

const getPublicProducts = async () => {
    const response = await api.get("/public/products");
    return response.data;
};

const getProductById = async (id: number) => {
    const response = await api.get(`/public/products/${id}`);
    return response.data;
};

const ProductService = {
    getPublicProducts,
    getProductById,
};

export default ProductService;
