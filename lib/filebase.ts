import { S3Client } from "@aws-sdk/client-s3";
import AWS from "aws-sdk";

const S3_KEY = process.env.S3_KEY || "";
const S3_SECRET = process.env.S3_SECRET || "";
const bucketName = process.env.S3_BUCKET || "share-house";

const s3 = new S3Client({
  region: "us-east-1",
  forcePathStyle: true,
  endpoint: "https://s3.filebase.com",
  credentials: {
    accessKeyId: S3_KEY,
    secretAccessKey: S3_SECRET,
  },
});

export { s3, bucketName };
