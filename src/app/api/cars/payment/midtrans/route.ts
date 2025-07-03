import { NextRequest, NextResponse } from "next/server";
import { BookingData } from "../../../../types/booking";

export async function POST(request: NextRequest) {
  try {
    const bookingData: BookingData = await request.json();

    // Midtrans server key (use environment variable in production)
    const serverKey =
      process.env.MIDTRANS_SERVER_KEY || "SB-Mid-server-your-server-key";
    const authString = Buffer.from(serverKey + ":").toString("base64");

    // Create transaction
    const parameter = {
      transaction_details: {
        order_id: `ORDER-${Date.now()}`,
        gross_amount: bookingData.totalAmount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: bookingData.customerName,
        email: bookingData.customerEmail,
        phone: bookingData.customerPhone,
      },
      item_details: [
        {
          id: `car-${bookingData.carId}`,
          price: bookingData.totalAmount,
          quantity: 1,
          name: `Car Rental - ${bookingData.totalDays} days`,
        },
      ],
    };

    const response = await fetch(
      "https://app.sandbox.midtrans.com/snap/v1/transactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authString}`,
        },
        body: JSON.stringify(parameter),
      }
    );

    const data = await response.json();

    if (data.token) {
      // Save booking to database here
      console.log("Booking saved:", bookingData);

      return NextResponse.json({ token: data.token });
    } else {
      return NextResponse.json(
        { error: "Failed to create payment token" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Midtrans payment error:", error);
    return NextResponse.json(
      { error: "Payment processing error" },
      { status: 500 }
    );
  }
}
