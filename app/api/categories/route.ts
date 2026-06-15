import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CATEGORIES_FILE_PATH = path.join(process.cwd(), "data", "categories.json");

export async function GET() {
  try {
    if (!fs.existsSync(CATEGORIES_FILE_PATH)) {
      return NextResponse.json({ error: "Categories database not found" }, { status: 404 });
    }
    const data = fs.readFileSync(CATEGORIES_FILE_PATH, "utf-8");
    const categories = JSON.parse(data || "[]");
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
