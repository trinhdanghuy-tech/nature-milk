import { useEffect, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

const CART_KEY = "nutmilk_cart";

function loadCart(): CartItem[] {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(loadCart());
  }, []);

  const add = (product: Omit<CartItem, "qty">) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === product.id);
      let newCart;

      if (exist) {
        newCart = prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        newCart = [...prev, { ...product, qty: 1 }];
      }

      saveCart(newCart);
      return newCart;
    });
  };

  const update = (id: string, qty: number) => {
    setCart((prev) => {
      const newCart = prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i));
      saveCart(newCart);
      return newCart;
    });
  };

  const remove = (id: string) => {
    setCart((prev) => {
      const newCart = prev.filter((i) => i.id !== id);
      saveCart(newCart);
      return newCart;
    });
  };

  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);

  return { cart, add, update, remove, count, total };
}
