import { port } from "./utils/config";
import { Hono } from "hono";
import quizRoute from "./routes/quiz.route";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowMethods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.route("/", quizRoute);
