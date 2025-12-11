import { port } from "./utils/config";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import quizRoute from "./routes/quiz.route";
import { cors } from "hono/cors";

const app = new Hono();

// app.get("/", (c) => c.text("hello from hono!"));

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowMethods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.route("/", quizRoute);

serve({ fetch: app.fetch, port: port });

console.log(`Hono server running on http://localhost:${port}`);
