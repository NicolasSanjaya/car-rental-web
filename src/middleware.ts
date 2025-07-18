import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  console.log({
    token,
    role,
  });

  // 🔒 Redirect user yang sudah login ke home jika akses /login
  if (token) {
    const alreadyLoginRoutes = [
      "/login",
      "/register",
      "/otp",
      "/reset-password",
      "/verify-email",
      "/dashboard",
      "/cars-management",
    ].includes(pathname);
    if (role !== "admin" && alreadyLoginRoutes) {
      console.log("⛔ User sudah login, redirect ke /");
      return NextResponse.redirect(new URL("/", request.url));
    }
    // ✅ Akses Role Admin
    if (role === "admin") {
      const allowedAdminPaths = ["/dashboard", "/profile", "/cars-management"];
      if (!allowedAdminPaths.includes(pathname)) {
        console.log(
          "⛔ Admin tidak boleh akses route ini, redirect ke /dashboard"
        );
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    // ✅ Akses Role User
    if (!role) {
      const blockedUserPaths = ["/dashboard", "/cars-management"];
      if (blockedUserPaths.includes(pathname)) {
        console.log("⛔ User tidak boleh akses route ini, redirect ke /");
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } else {
    const userNotLoginRoutes = [
      "/profile",
      "/dashboard",
      "/cars-management",
    ].includes(pathname);
    if (!token && userNotLoginRoutes) {
      console.log("⛔ User belum login, redirect ke /login");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
