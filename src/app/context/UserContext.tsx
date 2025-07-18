// app/context/UserContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "react-toastify";

type User = {
  email: string;
  full_name: string;
  id: number; // Assuming id is a unique identifier for the user
  role?: "admin" | "user"; // Assuming roles are either 'admin' or 'user'
};

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
  checkAuthStatus: () => Promise<void>;
  loading?: boolean;
  setIsLoading?: (loading: boolean) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      // 1. Ambil payload dari token JWT
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));

      // 2. Cek waktu kedaluwarsa (exp)
      // `exp` adalah Unix timestamp dalam detik, `Date.now()` dalam milidetik
      const expirationTime = decodedPayload.exp * 1000;

      if (Date.now() > expirationTime) {
        localStorage.removeItem("token");
        logout(); // Panggil fungsi logout jika token sudah kedaluwarsa
        setIsLoading(false);
        return;
      }
      // Verify token with your backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.data.user);
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  // Call checkAuthStatus on mount to verify user session
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUser(null);
        localStorage.removeItem("token");
        toast.success(data.message || "Logout successful");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        checkAuthStatus,
        loading: isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
