// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Providers } from "./context/Providers";
import { Bounce, ToastContainer } from "react-toastify";
import { AOSInit } from "./components/AOSInit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Turbo Rent",
  description: "Rent your dream car with ease and convenience",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer
          autoClose={3000}
          theme="dark"
          position="top-right"
          draggable
          transition={Bounce}
          closeOnClick
        />
        <AOSInit />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
