const request = require("supertest");
const createServer = require("../util/server");
const mongoose = require("mongoose");
const userService = require("../services/user.service");
const { MongoMemoryServer } = require("mongodb-memory-server");
const signJwt = require("../util/jwt");

const app = createServer();

const userInput = {
  name: "John Saa",
  email: "john.sa@example.com",
  password: "123456",
  address: {
    city: "kilcoole",
    street: "7835 new road",
    number: 3,
    zipcode: "12926-3874",
  },
  phone: "1-570-236-7033",
};

const userUpdated = {
  address: {
    city: "kilcoole",
    street: "7835 new road",
    number: 4,
    zipcode: "12926-3880",
  },
  phone: "1-570-236-7000",
};

const currentUser = {
  email: "john.sa@example.com",
  password: "123456",
};

const notRegistered = {
  email: "john@example.com",
  password: "123",
};

describe.skip("User", () => {
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

  describe("Register", () => {
    it("get the data of user", async () => {
      const res = await request(app).post("/api/auth/register").send(userInput);
      expect(res.statusCode).toBe(201);
      expect(res.body.user.role).toEqual("user");
      expect(res.body.user.name).toEqual(userInput.name);
    });

    it("Email already used 400 Error", async () => {
      await request(app).post("/api/auth/register").send(userInput);
      const res = await request(app).post("/api/auth/register").send(userInput);
      expect(res.statusCode).toBe(400);
    });
  });
  describe.skip("login", () => {
    it("Get current user", async () => {
      await request(app).post("/api/auth/register").send(userInput);
      const res = await request(app).post("/api/auth/login").send(currentUser);
      expect(res.statusCode).toBe(200);
    });
    it("Client Not registered 400 error", async () => {
      await request(app).post("/api/auth/register").send(userInput);
      const res = await request(app)
        .post("/api/auth/login")
        .send(notRegistered);
      expect(res.statusCode).toBe(400);
    });
  });
  describe.skip("update user data", () => {
    it("update user, user allowed to access route", async () => {
      const { body } = await request(app)
        .post("/api/auth/register")
        .send(userInput);
      const res = await request(app)
        .post("/api/auth/user/update/" + body.user._id)
        .set("Authorization", "Bearer" + " " + body.token)
        .send(userUpdated);
      expect(res.statusCode).toBe(201);
    });
    it("return error 401 user not allowed to access route", async () => {
      const { body } = await request(app)
        .post("/api/auth/register")
        .send(userInput);
      const res = await request(app)
        .post("/api/auth/user/update/" + body.user._id)
        .send(userUpdated);
      expect(res.statusCode).toBe(401);
    });
  });
});
