"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";

export default function CekCookieClientPage() {
  useEffect(() => {
    console.log("--- Memeriksa Cookie di Client ---");

    // Tunda sedikit untuk memastikan semua skrip sudah berjalan
    setTimeout(() => {
      const tokenFromCookie = Cookies.get("token");

      // Tampilkan semua cookie yang bisa diakses client
      console.log("Semua cookie yang bisa diakses client:", Cookies.get());

      if (tokenFromCookie) {
        console.log(
          'Cookie "token" DITEMUKAN di client. Nilainya:',
          tokenFromCookie
        );
      } else {
        console.log('Cookie "token" TIDAK DITEMUKAN di client.');
      }
    }, 5000); // Coba tunda 0.5 detik
  }, []);

  return (
    <div>
      <h1>Cek Cookie di Client</h1>
      <p>Buka console browser (F12) untuk melihat hasilnya.</p>
    </div>
  );
}
