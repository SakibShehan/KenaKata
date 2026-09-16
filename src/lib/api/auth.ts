import type { User } from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface TokenPair {
  access_token: string;
  refresh_token: string;
}

export async function loginRequest(email: string, password: string): Promise<TokenPair> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Invalid email or password");
  return res.json();
}

export async function getProfile(accessToken: string): Promise<User> {
  const res = await fetch(`${BASE_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load profile");
  return res.json();
}

export async function isEmailAvailable(email: string): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/users/is-available`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    cache: "no-store",
  });
  if (!res.ok) return true; // fail open — don't block signup on a check failure
  const data = await res.json();
  return !data.isAvailable;
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...input,
      avatar: "https://i.imgur.com/LDOO4Qs.jpg", 
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}