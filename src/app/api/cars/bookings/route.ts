/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Get all bookings (admin endpoint)
  try {
    // Mock data - replace with actual database query
    const bookings = [
      {
        id: "1",
        carId: 1,
        customerName: "John Doe",
        customerEmail: "john@example.com",
        startDate: "2024-07-10",
        endDate: "2024-07-15",
        totalAmount: 6000,
        paymentMethod: "midtrans",
        status: "confirmed",
        createdAt: "2024-07-03T10:00:00Z",
      },
    ];

    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch bookings", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Create new booking
  try {
    const bookingData = await request.json();

    // Generate booking ID
    const bookingId = `BK-${Date.now()}`;

    // Save to database (mock implementation)
    const newBooking = {
      id: bookingId,
      ...bookingData,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    console.log("New booking created:", newBooking);

    return NextResponse.json(newBooking);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create booking", details: error.message },
      { status: 500 }
    );
  }
}
