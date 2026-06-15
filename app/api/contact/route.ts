import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONTACTS_FILE_PATH = path.join(process.cwd(), "data", "contacts.json");

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function readContacts(): any[] {
  try {
    if (!fs.existsSync(CONTACTS_FILE_PATH)) {
      ensureDirectoryExistence(CONTACTS_FILE_PATH);
      fs.writeFileSync(CONTACTS_FILE_PATH, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(CONTACTS_FILE_PATH, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Failed to read contacts:", error);
    return [];
  }
}

function writeContacts(contacts: any[]) {
  try {
    ensureDirectoryExistence(CONTACTS_FILE_PATH);
    fs.writeFileSync(CONTACTS_FILE_PATH, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error("Failed to write contacts:", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message } = body;

    // Server-side validation
    if (!fullName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (phone && !/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ error: "Invalid 10-digit mobile number" }, { status: 400 });
    }

    const contacts = readContacts();
    const newContact = {
      id: `cnt-${Date.now()}`,
      fullName,
      email,
      phone,
      subject: subject || "No Subject",
      message,
      createdAt: new Date().toISOString(),
    };

    contacts.push(newContact);
    writeContacts(contacts);

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
