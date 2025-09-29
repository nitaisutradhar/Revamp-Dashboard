import { NextRequest, NextResponse } from "next/server";

interface ExtendedNextRequest extends NextRequest {
  geo?: {
    city?: string;
    country?: string;
    region?: string;
  };
}

export async function middleware(req: ExtendedNextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).ip ||
    "unknown";

  const userAgent = req.headers.get("user-agent") || "unknown";
  const path = req.nextUrl.pathname;

  // Safe geo access
  const country = req.geo?.country || "unknown";
  const city = req.geo?.city || "unknown";

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/visitors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ip, userAgent, path, country, city }),
    });
  } catch (err) {
    console.error("Visitor log failed:", err);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
