import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const REGION = "us-east-1";
const s3Client = new S3Client({ region: REGION });

export const importProductsFile = async (event) => {
  const { BUCKET_NAME } = process.env;
  const {
    queryStringParameters: { name },
  } = event;

  console.log(BUCKET_NAME);

  const putObjectCommandParams = {
    Bucket: BUCKET_NAME,
    Key: `uploaded/${name}`,
    ContentType: "text/csv",
  };
  console.log(putObjectCommandParams);
  const command = new PutObjectCommand(putObjectCommandParams);
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  console.log(JSON.stringify(signedUrl));
  console.log(signedUrl);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: signedUrl,
  };
};
