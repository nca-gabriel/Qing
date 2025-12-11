import { Hono } from "hono";
import { getQuiz, gradeQuiz } from "../controller/quiz.controller";

const router = new Hono();

router.get("/quiz", getQuiz);

router.post("/grade", gradeQuiz);

export default router;
