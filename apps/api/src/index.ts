import { Hono } from "hono";
import { cors } from "hono/cors";
import auth from "./routes/auth";
import health from "./routes/health";
import users from "./routes/users";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: process.env.WEB_ORIGIN ?? "http://localhost:3000",
    credentials: true,
  }),
);

app.route("/health", health);
app.route("/users", users);
app.route("/", auth);

export { app };

export default {
  port: 3001,
  fetch: app.fetch,
};
