import handle from "$lib/server/hooks"
import { BUCKET, s3 } from "$lib/server/s3"
import { CreateBucketCommand, PutBucketCorsCommand } from "@aws-sdk/client-s3"

// S3
// console.log("Creating bucket...")
// s3.send(new CreateBucketCommand({ Bucket: "my-bucket" })).then(() => {
//   console.log("Bucket created successfully")
//   s3.send(
//     new PutBucketCorsCommand({
//       Bucket: BUCKET,
//       CORSConfiguration: {
//         CORSRules: [
//           {
//             AllowedHeaders: ["*"],
//             AllowedMethods: ["GET", "PUT", "POST", "DELETE"],
//             AllowedOrigins: ["http://127.0.0.1:5173", "http://127.0.0.1:5174"],
//             ExposeHeaders: ["ETag"],
//             MaxAgeSeconds: 3000,
//           },
//         ],
//       },
//     })
//   ).then((a) => {
//     console.log("CORS configuration set successfully: ", a)
//   })
// })

export { handle }
