import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Elite Sports Car Rental",
  description: "Premium sports car rental service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-black text-white p-4 fixed w-full top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-red-500">
              Elite Sports Cars
            </h1>
            <div className="space-x-6">
              <Link href="/" className="hover:text-red-500 transition">
                Home
              </Link>
              <Link href="/cars" className="hover:text-red-500 transition">
                Cars
              </Link>
              <Link href="/about" className="hover:text-red-500 transition">
                About
              </Link>
              <Link href="/contact" className="hover:text-red-500 transition">
                Contact
              </Link>
            </div>
          </div>
        </nav>
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
