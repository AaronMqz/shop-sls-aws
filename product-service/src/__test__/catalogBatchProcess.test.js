import { SNSClient } from "@aws-sdk/client-sns";
import { createProduct } from "../handlers/createProduct.js";
import { catalogBatchProcess } from "../handlers/catalogBatchProcess";

jest.mock(`@aws-sdk/client-sns`);

SNSClient.mockImplementation(() => {
  return "SNSClient";
});

const event = {
  Records: [
    {
      body: '"{\\"description\\":\\"Batch Product Description5\\",\\"price\\":\\"23\\",\\"title\\":\\"Product2 task 3\\",\\"count\\":\\"30\\"}"',
    },
  ],
};

jest.mock("../handlers/createProduct.js");

describe("catalogBatchProcess", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("createProduct", async () => {
    await catalogBatchProcess(event);
    expect(createProduct).toHaveBeenCalledWith({
      body: '{"description":"Batch Product Description5","price":"23","title":"Product2 task 3","count":"30"}',
    });
  });

  it("products SNS", async () => {
    const response = await catalogBatchProcess(event);
    const { statusCode } = response;
    console.log(response);
    expect(statusCode).toBe(200);
  });
});
