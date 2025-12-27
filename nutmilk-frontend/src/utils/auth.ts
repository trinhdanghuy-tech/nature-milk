const KEY = "nutmilk_user";

export type User = {
  name: string;
  email: string;
  avatar: string;
  role?: string;
};

export function loginFake(email: string) {
  const user: User = {
    name: "Đăng Huy",
    email,
    avatar: "/assets/avatar/avatar.jpg",
    role: "gold",
  };

  localStorage.setItem(KEY, JSON.stringify(user));
}

export function getUser(): User | null {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export function logoutFake() {
  localStorage.removeItem(KEY);
}
export function isLoggedIn(): boolean {
  return !!localStorage.getItem("nutmilk_user");
}
