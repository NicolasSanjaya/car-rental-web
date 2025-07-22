// app/context/Providers.tsx
import { ReactNode } from "react";
import { UserProvider } from "./UserContext";
import { FormProvider } from "./RegisterContext";
import { User } from "../types/user";

export const Providers = ({
  children,
  initialUser,
  token,
}: {
  children: ReactNode;
  initialUser?: User;
  token?: string;
}) => {
  return (
    <UserProvider initialUser={initialUser} token={token}>
      <FormProvider>{children}</FormProvider>
    </UserProvider>
  );
};
