// app/context/UserContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types/user";

type UserContextType = {
  token?: string | null;
  user: User | null;
  setUser: (user: User | null) => void;
  loading?: boolean;
  setIsLoading?: (loading: boolean) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  children,
  initialUser,
  token,
}: {
  children: ReactNode;
  initialUser?: User | null;
  token?: string | null;
}) => {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading: isLoading,
        setIsLoading,
        token,
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
