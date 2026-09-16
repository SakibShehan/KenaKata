import { NextResponse } from "next/server";
import { isEmailAvailable, registerUser, loginRequest, getProfile } from "@/lib/api/auth";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  const available = await isEmailAvailable(email);
  if (!available) {
    return NextResponse.json({ error: "That email is already registered" }, { status: 409 });
  }

  try {
    await registerUser({ name, email, password });

    // Register korle login auto login hobe 
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
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}