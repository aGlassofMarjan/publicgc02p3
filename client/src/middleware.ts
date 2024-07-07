import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readPayloadJose } from "./lib/jwt";

export const middleware = async (request: NextRequest) => {
  const { url, method, nextUrl } = request;

  // Log requests except for API, static files, and favicon
  if (
    !url.includes("/api") &&
    !url.includes("_next/static") &&
    !url.includes("_next/image") &&
    !url.includes("favicon.ico")
  ) {
    console.log(method, url);
  }

  if (url.includes("/wishlist")) {
    console.log("Wishlist", method, url);

    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    console.log("token dari cookieStore", token);

    if (!token) {
      const loginUrl = new URL("/login", request.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }

    const tokenData = await readPayloadJose<{ id: string; email: string }>(
      token.value
    );

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", tokenData.id);
    requestHeaders.set("x-user-email", tokenData.email);
    // requestHeaders.set("x-custom-value", "Ini untuk mencoba data tambahan");
    // console.log(requestHeaders, "<<<<<<<<<<< middleware requestHeaders");

    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  return NextResponse.next();
};
