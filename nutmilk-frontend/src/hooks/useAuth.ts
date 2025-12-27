import { useState, useEffect } from "react";
import { getUser, logoutFake } from "../utils/auth";

export function useAuth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  function logout() {
    logoutFake();
    setUser(null);
  }

  return {
    user,
    loggedIn: !!user,
    logout,
  };
}
