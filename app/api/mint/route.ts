import { auth } from "@/auth";
import db from "@/lib/db";
import { bucketName, s3 } from "@/lib/filebase";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: {
        email: session.user!.email!,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
    }

    const formData = await req.formData();
    // const { title, cid, size } = await req.json();

    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const size = file.size;
    const fileName = `rak_i_${file.name.replaceAll(" ", "_")}`;

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    // Prepare the upload command with file metadata
    const uploadCommand = new PutObjectCommand({
      Body: fileBuffer,
      Bucket: bucketName,
      Key: fileName,
      ContentType: file.type,
      ACL: "public-read",
    });

    await s3.send(uploadCommand);

    const geObjectCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileName,
    });

    const object = await s3.send(geObjectCommand);
    const cid = object.Metadata?.cid;

    if (!cid) {
      return NextResponse.json({ message: "Can't mint" }, { status: 400 });
    }

    const existRecord = await db.certificate.findUnique({
      where: {
        cid,
      },
      include: {
        user: true,
      },
    });

    if (existRecord) {
      return NextResponse.json(
        {
          message: `This credential is already minted by ${existRecord.user.name}`,
        },
        { status: 400 }
      );
    }

    const newRecord = await db.certificate.create({
      data: {
        title,
        cid,
        size,
        userId: user.id,
      },
    });

    if (!newRecord) {
      return NextResponse.json(
        { message: "can't create record" },
        { status: 500 }
      );
    }

    console.log(`CID OF IMAGE -> ${newRecord.cid}`);

    return NextResponse.json({ message: "Minted", cid: newRecord.cid });
  } catch (error: any) {
    console.log("[ERROR_UPLOAD_ROUTE]: ", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
