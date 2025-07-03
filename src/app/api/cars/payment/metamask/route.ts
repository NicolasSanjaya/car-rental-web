import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const paymentData = await request.json();

    // Save payment information to database
    console.log("MetaMask payment saved:", paymentData);

    // In a real application, you would:
    // 1. Verify the transaction on the blockchain
    // 2. Save the booking and payment details to your database
    // 3. Send confirmation email to customer

    return NextResponse.json({
      success: true,
      message: "Payment processed successfully",
    });
  } catch (error) {
    console.error("MetaMask payment error:", error);
    return NextResponse.json(
      { error: "Payment processing error" },
      { status: 500 }
    );
  }
}
