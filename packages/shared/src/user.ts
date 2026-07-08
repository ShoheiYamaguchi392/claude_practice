import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string().nullable(),
});
export type User = z.infer<typeof userSchema>;

export const usersResponseSchema = z.array(userSchema);
export type UsersResponse = z.infer<typeof usersResponseSchema>;

export const createUserRequestSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});
export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
