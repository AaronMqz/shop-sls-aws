import { getProductsList } from "../handlers/getProductsList";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env.test" });

describe("getProductsList", () => {
  it("TEST: GET ALL PRODUCTS", async () => {
    const response = await getProductsList();
    const { statusCode } = response;

    expect(statusCode).toBe(200);
  });
});
