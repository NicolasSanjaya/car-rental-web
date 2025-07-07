// app/layout.tsx
import Navbar from "@/app/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OTP Verification",
  description: "...",
};

export default function OtpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-24">{children}</main>
    </>
  );
}
