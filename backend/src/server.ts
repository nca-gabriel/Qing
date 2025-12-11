import { Hono } from "hono";
import { cors } from "hono/cors";
import quizRoute from "./routes/quiz.route";

const app = new Hono();

app.use("*", cors({ origin: "*", credentials: true }));

app.route("/", quizRoute);

export default {
  fetch: app.fetch, // attach the Hono app to fetch
};
