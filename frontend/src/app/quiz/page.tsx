// import QuizForm from "../QuizForm";
// import { Questions } from "@/utils/types";
// import axios from "@/utils/axios.client";

// SSR
export default async function page() {
  // const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // full URL to Worker
  // const res = await axios.get<Questions[]>(`${backendUrl}/quiz`);
  // const questions: Questions[] = res.data;

  return (
    <div className="p-4 max-w-xl mx-auto ">
      <h1 className="text-center text-2xl font-bold mb-4">Qing Quiz</h1>
      {/* <QuizForm questions={questions} /> */}
    </div>
  );
}
