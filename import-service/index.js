import csv from "csv-parser";

export const handler = async (event) => {
  const { BUCKET_NAME } = process.env;

  console.log(BUCKET_NAME);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message:
          "Go Serverless v3.0! Your function executed successfully! TEST 3",
        input: event,
      },
      null,
      2
    ),
  };
};
