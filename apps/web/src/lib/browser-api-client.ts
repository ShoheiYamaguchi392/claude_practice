import { API_ROUTES, userSchema } from "shared";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

export async function login(email: string) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error(`Login failed: ${res.status}`);
  }

  return userSchema.parse(await res.json());
}

export async function getMe() {
  const res = await fetch(`${API_BASE_URL}${API_ROUTES.users}/me`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch /users/me: ${res.status}`);
  }

  return userSchema.parse(await res.json());
}
