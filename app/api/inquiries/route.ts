import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const QUOTES_FILE_PATH = path.join(process.cwd(), "data", "quotes.json");

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function readQuotes(): any[] {
  try {
    if (!fs.existsSync(QUOTES_FILE_PATH)) {
      ensureDirectoryExistence(QUOTES_FILE_PATH);
      fs.writeFileSync(QUOTES_FILE_PATH, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(QUOTES_FILE_PATH, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Failed to read quotes:", error);
    return [];
  }
}

function writeQuotes(quotes: any[]) {
  try {
    ensureDirectoryExistence(QUOTES_FILE_PATH);
    fs.writeFileSync(QUOTES_FILE_PATH, JSON.stringify(quotes, null, 2));
  } catch (error) {
    console.error("Failed to write quotes:", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, customerName, mobileNumber, email, requirementDetails, productCategory, quantity, productName } = body;

    // Server-side validation
    if (!customerName || !mobileNumber) {
      return NextResponse.json({ error: "Missing customer name or mobile number" }, { status: 400 });
    }

    const finalEmail = email || "bulk-inquiry@sriganeshenterprises.in";

    if (finalEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(finalEmail)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      return NextResponse.json({ error: "Invalid 10-digit mobile number" }, { status: 400 });
    }

    const quotes = readQuotes();
    const newQuote = {
      id: `qte-${Date.now()}`,
      companyName: companyName || "N/A",
      customerName,
      mobileNumber,
      email,
      requirementDetails: requirementDetails || `Inquiry for ${productName || productCategory || "General Catalog"}`,
      productCategory: productCategory || "N/A",
      quantity: quantity || "N/A",
      productName: productName || "N/A",
      createdAt: new Date().toISOString(),
    };

    quotes.push(newQuote);
    writeQuotes(quotes);

    return NextResponse.json({ success: true, message: "Quote request submitted successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
