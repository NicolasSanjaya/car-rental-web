"use client";

import { useEffect } from "react";
import AOS from "aos";

export const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      // Opsi konfigurasi AOS bisa ditambahkan di sini
      duration: 1000, // Durasi animasi dalam milidetik
      once: true, // Apakah animasi hanya terjadi sekali
    });
  }, []); // Array dependensi kosong memastikan useEffect hanya berjalan sekali setelah komponen mount

  return null; // Komponen ini tidak me-render elemen apa pun
};
