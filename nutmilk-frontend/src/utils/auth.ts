const KEY = "user";

export type User = {
  id?: number;
  username: string;
  fullName: string;
  role?: string;
  token?: string;
  avatar?: string;
};

// Deprecated: loginFake
export function loginFake(email: string) {
  // no-op or removed
}

export function getUser(): User | null {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export function logoutFake() {
  localStorage.removeItem("token");
  localStorage.removeItem(KEY);
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem("token");
}
