// app/context/FormContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const storedFormData = localStorage.getItem("form-data");
    if (storedFormData) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      localStorage.removeItem("form-data");
    }
  }, [timeLeft]);

  useEffect(() => {
    const storedFormData = localStorage.getItem("form-data");
    if (storedFormData) {
      setFormDataContext(JSON.parse(storedFormData));
    }
  }, []);

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
