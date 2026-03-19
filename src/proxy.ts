import { NextRequest, NextResponse } from "next/server";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/authUtils";
import { jwtUtils } from "./lib/jwtUtils";
import { getNewTokensWithRefreshToken, getUserInfo } from "./services/auth.services";

// ─── helpers ────────────────────────────────────────────────────────────────

/**
 * Returns true when the token expires within the next 5 minutes.
 * Works synchronously from the already-decoded payload — no extra async work.
 */
function isExpiringSoon(exp: number | undefined): boolean {
  if (!exp) return false;
  return exp * 1000 - Date.now() < 5 * 60 * 1000;
}

/**
 * Calls the refresh-token endpoint and returns the new response so the
 * caller can forward the Set-Cookie headers to the browser.
 */
async function tryRefreshTokens(
  refreshToken: string
): Promise<boolean> {
  try {
    const result = await getNewTokensWithRefreshToken(refreshToken);
    return Boolean(result);
  } catch (err) {
    console.error("[middleware] token refresh failed:", err);
    return false;
  }
}

// ─── main middleware ─────────────────────────────────────────────────────────

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    const accessToken  = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    // ── 1. Verify + decode the access token in ONE call ──────────────────────
    const tokenResult = accessToken
      ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
      : null;

    const isValidAccessToken = tokenResult?.success ?? false;
    const decodedAccessToken  = tokenResult?.data;

    // ── 2. Derive role (unify SUPER_ADMIN → ADMIN) ───────────────────────────
    let userRole: UserRole | null = null;
    if (decodedAccessToken) {
      const raw = decodedAccessToken.role as UserRole;
      userRole  = raw === "SUPER_ADMIN" ? "ADMIN" : raw;
    }

    const routeOwner = getRouteOwner(pathname);
    const isAuth     = isAuthRoute(pathname);

    // ── 3. Proactive token refresh (synchronous expiry check) ─────────────────
    //    Only fires when the token is valid but about to expire.
    if (isValidAccessToken && refreshToken && isExpiringSoon(decodedAccessToken?.exp)) {
      const requestHeaders = new Headers(request.headers);
      const refreshed = await tryRefreshTokens(refreshToken);

      if (refreshed) {
        requestHeaders.set("x-token-refreshed", "1");
      }

      return NextResponse.next({ request: { headers: requestHeaders } });
    }

    // ── 4. Auth-route redirect (logged-in users away from /login etc.) ────────
    if (isAuth && isValidAccessToken) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }

    // ── 5. /reset-password ───────────────────────────────────────────────────
    if (pathname === "/reset-password") {
      const email = request.nextUrl.searchParams.get("email");

      if (accessToken && email) {
        // Only fetch user info when we genuinely need it
        const userInfo = await getUserInfo();
        if (userInfo?.needPasswordChange) {
          return NextResponse.next();
        }
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
        );
      }

      if (email) return NextResponse.next();

      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // ── 6. Public routes ──────────────────────────────────────────────────────
    if (routeOwner === null) {
      return NextResponse.next();
    }

    // ── 7. Unauthenticated access to protected route ──────────────────────────
    if (!accessToken || !isValidAccessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // ── 8. Email-verification / forced-password-change gates ─────────────────
    //    Prefer reading flags from the JWT to avoid an extra API call.
    //    If your JWT carries these claims you can replace the getUserInfo() call
    //    with: const emailVerified = decodedAccessToken?.emailVerified
    //           const needPasswordChange = decodedAccessToken?.needPasswordChange
    //
    //    For now we fetch once and cache in a local variable.
    if (accessToken) {
      const userInfo = await getUserInfo();

      if (userInfo) {
        // Email not verified
        if (userInfo.emailVerified === false) {
          if (pathname !== "/verify-email") {
            const url = new URL("/verify-email", request.url);
            url.searchParams.set("email", userInfo.email);
            return NextResponse.redirect(url);
          }
          return NextResponse.next();
        }

        // Already verified but landed on verify-email
        if (userInfo.emailVerified && pathname === "/verify-email") {
          return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
          );
        }

        // Forced password change
        if (userInfo.needPasswordChange) {
          if (pathname !== "/reset-password") {
            const url = new URL("/reset-password", request.url);
            url.searchParams.set("email", userInfo.email);
            return NextResponse.redirect(url);
          }
          return NextResponse.next();
        }

        // Password already changed but still on reset-password
        if (!userInfo.needPasswordChange && pathname === "/reset-password") {
          return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
          );
        }
      }
    }

    // ── 9. Common protected routes ────────────────────────────────────────────
    if (routeOwner === "COMMON") {
      return NextResponse.next();
    }

    // ── 10. Role-based route guard ────────────────────────────────────────────
    if (
      routeOwner === "ADMIN" ||
      routeOwner === "DOCTOR" ||
      routeOwner === "PATIENT"
    ) {
      if (routeOwner !== userRole) {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
        );
      }
    }

    return NextResponse.next();
  } catch (err) {
    console.error("[middleware] unhandled error:", err);
    // Fail open — let the request through rather than hard-blocking the user.
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api          (API routes)
     * - _next/static (static assets)
     * - _next/image  (image optimisation)
     * - metadata files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};