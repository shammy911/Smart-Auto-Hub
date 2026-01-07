import { NextResponse } from "next/server";
import {prisma} from "../../../../lib/prisma.ts";

export async function GET(req, context) {

    const params = await context.params;
    const id = params.id;


    // If you use Next.js 13.4+ App Router:
    const carId = id;  // string

    if(isNaN(carId)) {
        return new Response("Invalid ID", { status: 400 });
    }

    const car = await prisma.Car.findUnique({
        where: { id:Number(carId) }, // cast to number if your ID is Int
    });

    if (!car) return new Response("Car not found", { status: 404 });

    return new Response(JSON.stringify(car), { status: 200 });
}

export async function PUT(req, context) {
    const params = await context.params;
    const id = params.id;
    const carId = Number(id);

    if (isNaN(carId)) {
        return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
    }

    try {
        const body = await req.json();
        
        // Ensure price is a number if present
        if (body.price) body.price = Number(body.price);
        if (body.year) body.year = Number(body.year);
        if (body.mileage) body.mileage = Number(body.mileage);
        
        // Remove ID from body to avoid trying to update it
        delete body.id;

        const updatedCar = await prisma.Car.update({
            where: { id: carId },
            data: body,
        });

        return new Response(JSON.stringify(updatedCar), { status: 200 });
    } catch (error) {
        console.error("Error updating car:", error);
        return new Response(JSON.stringify({ error: "Failed to update car" }), { status: 500 });
    }
}

export async function DELETE(req, context) {
    const params = await context.params;
    const id = params.id;
    const carId = Number(id);

    if (isNaN(carId)) {
        return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
    }

    try {
        await prisma.Car.delete({
            where: { id: carId },
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("Error deleting car:", error);
        return new Response(JSON.stringify({ error: "Failed to delete car" }), { status: 500 });
    }
}