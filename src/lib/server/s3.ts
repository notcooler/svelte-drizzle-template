import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { env } from "$env/dynamic/private"

export const BUCKET = "my-bucket"

if (!env.S3_REGION) throw new Error("S3_REGION is not set")
if (!env.S3_ENDPOINT) throw new Error("S3_ENDPOINT is not set")
if (!env.S3_ACCESS_KEY) throw new Error("S3_ACCESS_KEY is not set")
if (!env.S3_SECRET_KEY) throw new Error("S3_SECRET_KEY is not set")

export const s3 = new S3Client({
  region: env.S3_REGION,
  endpoint: env.S3_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  },
})

export async function getUploadSignedUrl(
  filename: string,
  contentType: string
) {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: filename,
    ContentType: contentType,
  })

  return await getSignedUrl(s3, command, { expiresIn: 300 }) // 5 min
}

export async function getImageSignedUrl(filename: string) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: filename,
  })

  return await getSignedUrl(s3, command, { expiresIn: 3600 }) // 1 hour
}
