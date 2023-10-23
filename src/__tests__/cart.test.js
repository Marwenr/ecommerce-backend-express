const request = require("supertest");
const createServer = require("../util/server");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = createServer();

const cart = {
  userId: "5",
  products: [
    {
      productId: "1",
      quantity: 6,
    },
  ],
};

describe.skip("test cart turn of protect and allowedTo first", () => {
  beforeEach(async () => {
    const mongod = new MongoMemoryServer();
    await mongod.start();
    const mongoUri = mongod.getUri();

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  describe.skip("test validation", () => {
    it("empty userId", async () => {
      const res = await request(app)
        .post("/api/cart/create")
        .send({ userId: "", products: [] });
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ message: "userId is required." });
    });
    it("products empty arry", async () => {
      const res = await request(app)
        .post("/api/cart/create")
        .send({ userId: "1215", products: [] });
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        message: "products is required and should be a non-empty array.",
      });
    });
    it("products contains just productId", async () => {
      const res = await request(app)
        .post("/api/cart/create")
        .send({
          userId: "1215",
          products: [{ productId: "1" }],
        });
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        message:
          "Each product in the 'products' array should have 'productId' and 'quantity'.",
      });
    });
    it("all validation true", async () => {
      const res = await request(app).post("/api/cart/create").send(cart);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("userId", cart.userId);
    });
  });
  describe.skip("get", () => {
    it("get all cart", async () => {
      const res = await request(app).get("/api/cart/all");
      expect(res.statusCode).toBe(200);
    });
    it("get cart by id", async () => {
      const resCart = await request(app).post("/api/cart/create").send(cart);
      const res = await request(app).get("/api/cart/" + resCart.body._id);
      expect(res.statusCode).toBe(200);
    });
  });
  describe.skip("delete", () => {
    it("delete cart", async () => {
      const resCart = await request(app).post("/api/cart/create").send(cart);
      const res = await request(app).delete("/api/cart/" + resCart.body._id);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: "Cart deleted successfully" });
    });
  });
});
