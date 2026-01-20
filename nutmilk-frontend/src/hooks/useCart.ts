import { useEffect, useState } from "react";
import CartService from "../services/cart.service";
import AuthService from "../services/auth.service";
import { useToast } from "../components/common/ToastContext";

export type CartItem = {
  id: string; // ProductID
  name: string;
  price: number;
  image: string;
  qty: number;
  cartItemId?: number; // Backend ID
};

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const user = AuthService.getCurrentUser();
  const { showToast } = useToast();

  useEffect(() => {
    if (user) {
      CartService.getCart().then((data) => {
        // Map backend Cart to Frontend CartItem
        const mappedItems = data.items.map((item: any) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
          qty: item.quantity,
          cartItemId: item.id
        }));
        setCart(mappedItems);
      }).catch(console.error);
    }
  }, []);

  const add = async (product: Omit<CartItem, "qty">) => {
    if (!user) {
      showToast("Vui lòng đăng nhập!", "error");
      return;
    }
    try {
      await CartService.addToCart(Number(product.id), 1);
      // Refresh cart
      const data = await CartService.getCart();
      const mappedItems = data.items.map((item: any) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
        qty: item.quantity,
        cartItemId: item.id
      }));
      setCart(mappedItems);
      showToast("Đã thêm vào giỏ!", "success");
    } catch (e) {
      console.error(e);
      showToast("Lỗi khi thêm vào giỏ", "error");
    }
  };

  const update = async (id: string, qty: number) => {
    // Feature pending backend implementation
    console.log(`Update requested for ${id} to ${qty}`);
    showToast("Chức năng cập nhật số lượng đang được phát triển!", "info");
  };

  const remove = async (id: string) => {
    if (!user) return;
    const item = cart.find(c => c.id == id);
    if (item && item.cartItemId) {
      await CartService.removeFromCart(item.cartItemId);
      setCart(prev => prev.filter(c => c.id != id));
      showToast("Đã xóa sản phẩm khỏi giỏ", "info");
    }
  };

  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);

  return { cart, add, update, remove, count, total };
}
