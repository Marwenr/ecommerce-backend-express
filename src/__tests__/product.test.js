const request = require("supertest");
const createServer = require("../util/server");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = createServer();

const product = {
  title: "test",
  description: "test",
  image: "test",
  category: "test",
  price: 15,
};

const invalidProduct = {
  title: "test",
  description: "test",
  image: "test",
}

const category = {
  title: "test",
};

const invalidCategory = {
  title: ""
}

describe("Products", () => {
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
    await mongoose.connection.close();
  });

  describe("products", () => {
    it("get products", async () => {
      const res = await request(app).get("/api/shop/products");
      expect(res.statusCode).toBe(200);
    });
    it("add product <turn of protect, allowedTo first>", async () => {
      const res = await request(app)
        .post("/api/shop/product/create")
        .send(product);
      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({
        title: product.title,
        description: product.description,
        image: product.image,
        category: product.category,
        price: product.price,
      });
    });
    it("validation product error 400 <turn of protect, allowedTo first>", async () => {
      const res = await request(app)
        .post("/api/shop/product/create")
        .send(invalidProduct);
      expect(res.statusCode).toBe(400);
    });
  });

  describe("categories", () => {
    it("get categories", async () => {
      const res = await request(app).get("/api/shop/categories");
      expect(res.statusCode).toBe(200);
    });
    it("add category <turn of protect, allowedTo first>", async () => {
      const res = await request(app)
        .post("/api/shop/category/create")
        .send(category);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("title", category.title);
    });
    it("validation category error 400 <turn of protect, allowedTo first>", async () => {
      const res = await request(app)
        .post("/api/shop/category/create")
        .send(invalidCategory);
      expect(res.statusCode).toBe(400);
    });
  });
});
