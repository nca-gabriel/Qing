import { NextResponse } from "next/server";
import axios from "@/utils/axios.server"; // your configured axios with baseURL

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await axios.post("/grade", body);

    return NextResponse.json(res.data);
  } catch {
    return NextResponse.json(
      { error: "Failed to grade quiz" },
      { status: 500 }
    );
  }
}
