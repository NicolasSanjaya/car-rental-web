// app/context/FormContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type FormData = {
  name: string;
  email: string;
  password: string;
};

type FormContextType = {
  formData: FormData | null;
  setFormDataContext: (data: FormData) => void;
  clearRegisterData: () => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormDataContext] = useState<FormData | null>(null);

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormDataContext,
        clearRegisterData: () => setFormDataContext(null),
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
