require("dotenv").config();
import { createProduct } from "./createProduct";
import serviceResponse from "../services/response";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const { REGION, SNS_ARN } = process.env;
const snsClient = new SNSClient({ region: REGION });

const sendToSNS = async (product) => {
  const { title } = JSON.parse(JSON.parse(product));

  const params = {
    Subject: "Hello! this is a Email from CatalogBatchProcess",
    Message: product,
    TopicArn: SNS_ARN,
    MessageAttributes: {
      title: {
        DataType: "String",
        StringValue: title,
      },
    },
  };
  try {
    const data = await snsClient.send(new PublishCommand(params));
    return data;
  } catch (err) {
    console.error(err.message);
  }
};

exports.catalogBatchProcess = async (event) => {
  const products = event.Records.map(({ body }) => body);
  try {
    for (const product of products) {
      await createProduct({ body: JSON.parse(product) });
      await sendToSNS(product);
    }

    console.log("SUCCESS: 200", "BODY: ");
    return serviceResponse.success("SUCCESS", 200);
  } catch (err) {
    console.error("ERROR 500: ", err.message);
    return serviceResponse.error(err.message, 500);
  }
};
