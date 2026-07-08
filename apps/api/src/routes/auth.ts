import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";
import { JWT_COOKIE_NAME, JWT_SECRET } from "../middleware/auth.ts";
import prisma from "../lib/prisma.ts";

const auth = new Hono();

auth.post("/login", async (c) => {
  const { email } = await c.req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return c.json({ error: "invalid credentials" }, 401);
  }

  const token = await sign(
    {
      sub: user.id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    JWT_SECRET,
  );

  setCookie(c, JWT_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    path: "/",
  });

  return c.json({ id: user.id, email: user.email, name: user.name });
});

export default auth;
