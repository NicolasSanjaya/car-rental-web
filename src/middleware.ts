import { NextRequest, NextResponse } from "next/server";

// Middleware akan dijalankan di setiap permintaan
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  if (token && pathname === "/login")
    return NextResponse.redirect(new URL("/", request.url));
  if (token && pathname === "/register")
    return NextResponse.redirect(new URL("/", request.url));

  if (
    role === "admin" &&
    pathname !== "/dashboard" &&
    pathname !== "/profile" &&
    pathname !== "/cars-management"
  ) {
    console.log("⛔ Admin tidak boleh akses route ini, redirect ke /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else if (
    (role !== "admin" && pathname === "/dashboard") ||
    pathname === "/cars-management"
  ) {
    console.log("⛔ User tidak boleh akses route ini, redirect ke /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Jika bukan admin atau bukan route '/', lanjutkan
  return NextResponse.next();
}

export const config = {
  // matcher: ["/", "/dashboard"], // Tentukan route yang ingin diterapkan middleware
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
