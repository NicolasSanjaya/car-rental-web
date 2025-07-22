import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  console.log("🔑 Token:", token);
  console.log("👤 Role:", role);

  // 🔒 Redirect user yang sudah login ke home jika akses /login
  if (
    token &&
    [
      "/login",
      "/register",
      "/otp",
      "/reset-password",
      "/forgot-password",
    ].includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Akses Role Admin
  if (role === "admin") {
    const allowedAdminPaths = ["/dashboard", "/profile", "/cars-management"];
    if (!allowedAdminPaths.includes(pathname)) {
      console.log("redirect");
      console.log(
        "⛔ Admin tidak boleh akses route ini, redirect ke /dashboard"
      );
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    console.log("tidak redirect");
    return;
  }

  // ✅ Akses Role User
  if (!role) {
    const blockedUserPaths = ["/dashboard", "/cars-management"];
    if (blockedUserPaths.includes(pathname)) {
      console.log("⛔ User tidak boleh akses route ini, redirect ke /");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (!token && pathname === "/profile") {
    console.log("⛔ User tidak boleh akses route ini, redirect ke /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!token && pathname === "/bookings") {
    console.log("⛔ User tidak boleh akses route ini, redirect ke /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!token && pathname === "/payment/success") {
    console.log("⛔ User tidak boleh akses route ini, redirect ke /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
