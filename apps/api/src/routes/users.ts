import { Hono } from "hono";
import { createUserRequestSchema } from "shared";
import prisma from "../lib/prisma.ts";
import { authMiddleware } from "../middleware/auth.ts";

const users = new Hono();

users.get("/", async (c) => {
  const allUsers = await prisma.user.findMany();
  return c.json(allUsers);
});

users.get("/me", authMiddleware, async (c) => {
  const payload = c.get("jwtPayload") as { sub: number };
  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user) {
    return c.json({ error: "user not found" }, 404);
  }
  return c.json(user);
});

users.post("/", async (c) => {
  const body = createUserRequestSchema.parse(await c.req.json());
  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
    },
  });
  return c.json(user, 201);
});

export default users;
