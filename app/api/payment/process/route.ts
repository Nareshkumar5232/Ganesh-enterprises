import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";

interface PaymentRequest {
  orderId: string;
  amount: number;
  email: string;
  phone: string;
  customerName: string;
  productInfo: string;
  redirectUrl?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as PaymentRequest;

    const {
      orderId,
      amount,
      email,
      phone,
      customerName,
      productInfo,
      redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://sri-ganesh-enterprises-backend.onrender.com"}/api/payment/verify`,
    } = body;

    // Validate required fields
    if (!orderId || !amount || !email || !phone || !customerName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate amount
    if (amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const appId = process.env.CASHFREE_APP_ID;
    const appSecret = process.env.CASHFREE_APP_SECRET;
    const baseUrl = process.env.CASHFREE_API_BASE_URL || "https://api.cashfree.com/pg";

    if (!appId || !appSecret) {
      console.error("Cashfree credentials not configured");
      return NextResponse.json(
        { error: "Payment service not configured" },
        { status: 500 }
      );
    }

    // Prepare payment payload
    const paymentPayload = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: `cust_${Date.now()}`,
        customer_email: email,
        customer_phone: phone,
        customer_name: customerName,
      },
      order_meta: {
        return_url: redirectUrl,
        notify_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://sri-ganesh-enterprises-backend.onrender.com"}/api/payment/webhook`,
      },
      order_note: productInfo,
    };

    // Create signature
    const signatureMessage = `/pg/orders${JSON.stringify(paymentPayload)}`;
    const signature = crypto
      .createHmac("sha256", appSecret)
      .update(signatureMessage)
      .digest("base64");

    // Call Cashfree API
    const response = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": appId,
        "x-client-secret": appSecret,
      },
      body: JSON.stringify(paymentPayload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Cashfree API error:", errorData);
      return NextResponse.json(
        { error: "Failed to create payment order" },
        { status: response.status }
      );
    }

    const paymentOrder = await response.json();

    return NextResponse.json({
      success: true,
      orderId: paymentOrder.order_id,
      paymentSessionId: paymentOrder.payment_session_id,
      redirectUrl: paymentOrder.redemption_reference_id,
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
