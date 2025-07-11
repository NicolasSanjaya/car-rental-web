import { NextRequest, NextResponse } from "next/server";

// Middleware akan dijalankan di setiap permintaan
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ambil data role dari cookie (atau header/token/session sesuai sistem kamu)
  const role = request.cookies.get("role")?.value;

  // // Blokir akses ke '/' jika role adalah 'admin'
  // if (pathname === "/" && role === "admin") {
  //   // Redirect ke halaman lain, misalnya /admin-dashboard
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }
  if (
    role === "admin" &&
    pathname !== "/dashboard" &&
    pathname !== "/profile"
  ) {
    console.log("⛔ Admin tidak boleh akses route ini, redirect ke /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Jika bukan admin atau bukan route '/', lanjutkan
  return NextResponse.next();
}

export const config = {
  // matcher: ["/", "/dashboard"], // Tentukan route yang ingin diterapkan middleware
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
