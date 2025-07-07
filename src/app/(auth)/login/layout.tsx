// app/layout.tsx
import Navbar from "@/app/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "...",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-24">{children}</main>
    </>
  );
}
