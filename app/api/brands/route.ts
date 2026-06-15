import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BRANDS_FILE_PATH = path.join(process.cwd(), "data", "brands.json");

export async function GET() {
  try {
    if (!fs.existsSync(BRANDS_FILE_PATH)) {
      return NextResponse.json({ error: "Brands database not found" }, { status: 404 });
    }
    const data = fs.readFileSync(BRANDS_FILE_PATH, "utf-8");
    const brands = JSON.parse(data || "[]");
    return NextResponse.json({ success: true, brands });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
