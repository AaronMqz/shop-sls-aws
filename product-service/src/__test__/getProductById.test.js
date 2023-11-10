import { getProductById } from "../handlers/getProductById";

describe("getProductById", () => {
  it("TEST: GET PRODUCT BY ID", async () => {
    const response = await getProductById({
      pathParameters: {
        productId: "3590f3c1-c5df-4b16-89d4-3295a1522b2b",
      },
    });
    const { statusCode } = response;

    expect(statusCode).toBe(200);
  });

  describe("getProductById - Product not found", () => {
    it("TEST: GET PRODUCT BY ID", async () => {
      const response = await getProductById({
        pathParameters: {
          productId: "0",
        },
      });
      const { statusCode } = response;
      console.log(response);
      expect(statusCode).toBe(400);
    });
  });
});
