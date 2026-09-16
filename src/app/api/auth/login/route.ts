
import { NextResponse } from "next/server";
import { loginRequest, getProfile } from "@/lib/api/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const { access_token } = await loginRequest(email, password);
    const user = await getProfile(access_token);

    const response = NextResponse.json({ user });
    response.cookies.set("token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, 
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }
}