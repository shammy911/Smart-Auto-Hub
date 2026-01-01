import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, subject, content } = await req.json();

    if (!title || !subject || !content) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    const newsletter = await prisma.newsletter.create({
      data: { title, subject, content },
    });

    return NextResponse.json(newsletter);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create newsletter" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const newsletters = await prisma.newsletter.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      broadcasts: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  return NextResponse.json(newsletters);
}
