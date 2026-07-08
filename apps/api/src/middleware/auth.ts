import { jwt } from "hono/jwt";

export const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret-change-me";
export const JWT_COOKIE_NAME = "token";

export const authMiddleware = jwt({
  secret: JWT_SECRET,
  alg: "HS256",
  cookie: JWT_COOKIE_NAME,
});
