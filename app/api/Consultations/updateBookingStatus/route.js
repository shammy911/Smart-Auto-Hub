import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookingId, status } = await req.json();

    if (!bookingId || !["ACCEPTED", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const advisor = await prisma.admin.findUnique({
      where: { id: session.user.id },
    });

    if (!advisor) {
      return NextResponse.json({ error: "Not an advisor" }, { status: 403 });
    }

    const booking = await prisma.consultationBooking.findFirst({
      where: {
        id: String(bookingId),
        advisorId: advisor.id,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found or unauthorized" },
        { status: 403 },
      );
    }

    const updatedBooking = await prisma.consultationBooking.update({
      where: { id: booking.id },
      data: { status },
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("Failed to update booking status:", error);
    return NextResponse.json(
      { error: "Failed to update booking status" },
      { status: 500 },
    );
  }
}
