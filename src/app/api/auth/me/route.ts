import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getProfile } from "@/lib/api/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  try {
    const user = await getProfile(token);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}