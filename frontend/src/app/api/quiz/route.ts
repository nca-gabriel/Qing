import { NextResponse } from "next/server";
import axios from "@/utils/axios.server";

export async function GET() {
  const res = await axios.get("/quiz");
  return NextResponse.json(res.data);
}
