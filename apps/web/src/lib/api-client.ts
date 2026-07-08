import { API_ROUTES, usersResponseSchema, type UsersResponse } from "shared";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:3001";

export async function getUsers(): Promise<UsersResponse> {
  const res = await fetch(`${API_BASE_URL}${API_ROUTES.users}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status}`);
  }

  return usersResponseSchema.parse(await res.json());
}
