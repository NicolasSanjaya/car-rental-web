// app/context/Providers.tsx
"use client";

import { ReactNode } from "react";
import { UserProvider } from "./UserContext";
import { FormProvider } from "./RegisterContext";
import { User } from "../types/user";

export const Providers = ({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser?: User;
}) => {
  return (
    <UserProvider initialUser={initialUser}>
      <FormProvider>{children}</FormProvider>
    </UserProvider>
  );
};
