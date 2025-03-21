import { auth } from "@/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: {
        email: session.user!.email!,
      },
      select: {
        id: true,
        name: true,
        image: true,
        Certificates: {
          select: {
            id: true,
            cid: true,
            size: true,
            title: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
    }

    const payload = user.Certificates;

    return NextResponse.json({
      payload,
    });
  } catch (error: any) {
    console.log("[ERROR_FEED_ROUTE]: ", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
