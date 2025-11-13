import { client } from "@lib/sanity";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    client,
    request.url,
  );

  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }

  (await draftMode()).enable();

  const response = NextResponse.redirect(new URL(redirectTo, request.url));
  response.cookies.set("isDraftMode", "true", {
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });

  return response;
}
