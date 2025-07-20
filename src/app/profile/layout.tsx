// app/layout.tsx
import Navbar from "@/app/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "...",
};

export default async function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-24 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {children}
      </main>
    </>
  );
}
