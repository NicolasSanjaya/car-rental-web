// app/layout.tsx
import Navbar from "@/app/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "...",
};

export default function RegisterLayout({
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
