import { S3Client } from "@aws-sdk/client-s3";
import {
  GetObjectCommand,
  PutObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import csv from "csv-parser";
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

const REGION = "us-east-1";
const s3Client = new S3Client({ region: REGION });
const sqs = new SQSClient({ region: REGION });

const sendToSQS = (data) => {
  sqs.send(
    new SendMessageCommand(
      {
        MessageBody: JSON.stringify(data),
        QueueUrl: process.env.SQS_URL,
      },
      () => console.log("Send Message for:" + data)
    )
  );
};

export const importFileParser = async (event) => {
  const { BUCKET_NAME } = process.env;
  try {
    console.log("Parser Event", event.Records);
    const bucketName = event.Records[0].s3.bucket.name;
    const objectKey = event.Records[0].s3.object.key;

    const getObjectCommandParams = {
      Bucket: bucketName,
      Key: objectKey,
    };

    console.log(`Trying to parse object ${objectKey}...`);

    const command = new GetObjectCommand(getObjectCommandParams);
    const { Body: readableStream } = await s3Client.send(command);

    await new Promise((resolve, reject) => {
      const onData = (data) => {
        console.log("Record: ", data);
        sendToSQS(JSON.stringify(data));
      };
      const onError = (error) => reject(error);
      const onEnd = () => {
        console.log(`Object ${objectKey} was parsed successfully`);
        resolve();
      };

      readableStream
        .pipe(csv())
        .on("data", onData)
        .on("end", onEnd)
        .on("error", onError);
    });

    console.log("Moving object from uploaded/ folder to parsed/ folder...");

    const fileDestinationKey = objectKey.replace("uploaded", "parsed");

    const copyObjectCommandParams = {
      Bucket: BUCKET_NAME,
      CopySource: `${BUCKET_NAME}/${objectKey}`,
      Key: fileDestinationKey,
    };

    const copyCommand = new CopyObjectCommand(copyObjectCommandParams);

    await s3Client.send(copyCommand);

    const deleteObjectCommandParams = {
      Bucket: BUCKET_NAME,
      Key: objectKey,
    };

    const deleteCommand = new DeleteObjectCommand(deleteObjectCommandParams);
    await s3Client.send(deleteCommand);

    console.log("Object was moved successfully");
  } catch (err) {
    console.error("ERROR 500: ", err.message);
  }
};
