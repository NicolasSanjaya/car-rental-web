// app/layout.tsx
import Navbar from "@/app/components/Navbar";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
  description: "...",
};

export default async function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("cookie", cookieStore.getAll());

  if (!token) {
    redirect("/login"); // redirect jika cookie 'token' tidak ada
  }
  return (
    <>
      <Navbar />
      <main className="pt-24 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {children}
      </main>
    </>
  );
}
