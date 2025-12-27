// src/utils/cart.ts

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
};

const CART_KEY = "nutmilk_cart";

/* ================== GET CART ================== */
export function getCart(): CartItem[] {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

/* ================== SAVE CART ================== */
function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ================== ADD TO CART ================== */
export function addToCart(item: CartItem) {
  const cart = getCart();
  const exist = cart.find((p) => p.id === item.id);

  if (exist) {
    exist.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  saveCart(cart);
}

/* ================== REMOVE ================== */
export function removeFromCart(id: string) {
  const cart = getCart().filter((p) => p.id !== id);
  saveCart(cart);
}

/* ================== COUNT ================== */
export function getCartCount(): number {
  return getCart().reduce((sum, p) => sum + p.qty, 0);
}
// ================== UPDATE QTY ==================
export function updateQty(id: string, qty: number) {
  const cart = getCart();

  const item = cart.find((p) => p.id === id);
  if (!item) return;

  if (qty <= 0) {
    // xóa nếu qty <= 0
    const newCart = cart.filter((p) => p.id !== id);
    localStorage.setItem("nutmilk_cart", JSON.stringify(newCart));
    return;
  }

  item.qty = qty;
  localStorage.setItem("nutmilk_cart", JSON.stringify(cart));
}
