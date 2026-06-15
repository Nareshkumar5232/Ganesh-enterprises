import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ORDERS_FILE_PATH = path.join(process.cwd(), "data", "orders.json");

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function readOrders(): any[] {
  try {
    if (!fs.existsSync(ORDERS_FILE_PATH)) {
      ensureDirectoryExistence(ORDERS_FILE_PATH);
      fs.writeFileSync(ORDERS_FILE_PATH, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(ORDERS_FILE_PATH, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Failed to read orders:", error);
    return [];
  }
}

function writeOrders(orders: any[]) {
  try {
    ensureDirectoryExistence(ORDERS_FILE_PATH);
    fs.writeFileSync(ORDERS_FILE_PATH, JSON.stringify(orders, null, 2));
  } catch (error) {
    console.error("Failed to write orders:", error);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const orders = readOrders();
    const order = orders.find((o) => o.orderId === orderId);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const order = await request.json();

    if (!order || !order.orderId) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const orders = readOrders();
    orders.push(order);
    writeOrders(orders);

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
