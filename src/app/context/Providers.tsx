// app/context/Providers.tsx
"use client";

import { ReactNode } from "react";
import { UserProvider } from "./UserContext";
import { FormProvider } from "./RegisterContext";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <FormProvider>{children}</FormProvider>
    </UserProvider>
  );
};
