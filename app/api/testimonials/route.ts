import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TESTIMONIALS_FILE_PATH = path.join(process.cwd(), "data", "testimonials.json");

export async function GET() {
  try {
    if (!fs.existsSync(TESTIMONIALS_FILE_PATH)) {
      return NextResponse.json({ error: "Testimonials database not found" }, { status: 404 });
    }
    const data = fs.readFileSync(TESTIMONIALS_FILE_PATH, "utf-8");
    const testimonials = JSON.parse(data || "[]");
    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
