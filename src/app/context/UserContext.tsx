// app/context/UserContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      // Verify token with your backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        console.log({ userData });
        setUser(userData.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  // Call checkAuthStatus on mount to verify user session

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
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
