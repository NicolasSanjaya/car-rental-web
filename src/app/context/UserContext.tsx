// app/context/UserContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  email: string;
  full_name: string;
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
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Verify token with your backend
        const response = await fetch("/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          console.log("User data verify jwt:", userData);
          setUser(userData.data.user);
        } else {
          localStorage.removeItem("token");
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => setUser(null);

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
