import "aws-sdk-client-mock-jest";
import { mockClient } from "aws-sdk-client-mock";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { ObjectReadableMock } from "stream-mock";
import { importFileParser } from "../importFileParser";

const obj = {
  Records: [
    {
      s3: {
        object: {
          key: "uploaded/test.csv",
        },
      },
    },
  ],
};

test("Mock test", async () => {
  const mock = mockClient(S3Client);
  mock.on(GetObjectCommand).resolves({ Body: new ObjectReadableMock("test") });
  await importFileParser(obj);
  expect(mock).toHaveReceivedCommand(GetObjectCommand);
});
