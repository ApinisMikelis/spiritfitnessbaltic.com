import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  (await draftMode()).disable();

  const response = NextResponse.redirect(new URL("/", request.url));

  response.cookies.delete("isDraftMode");

  return response;
}
