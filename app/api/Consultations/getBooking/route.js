import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const bookings = await prisma.consultationBooking.findMany({
            orderBy: { preferredDate: "desc" },
        });

        return NextResponse.json(bookings);
    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { message: "Failed to fetch bookings" },
            { status: 500 }
        );
    }
}
