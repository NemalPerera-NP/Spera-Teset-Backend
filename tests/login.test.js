const mongoose = require("mongoose");

const supertest = require("supertest");
const express = require("express");
const connectDB = require("../src/config/db");

const {
  userRegisterControler,
  loginControl,
} = require("../src/controllers/UserControlers");

const app = express();
app.use(express.json());
connectDB();

app.post("/api/auth/login", loginControl);

//test cases for user login
describe("POST /api/auth/login", () => {
  //test 01
  it("should require a username", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      password: "hansana",
    });
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toEqual(
      "Please provide Username or Password"
    );
  });

  //test 02
  it("should require a Password", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      username: "HSDE",
    });
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toEqual(
      "Please provide Username or Password"
    );
  });

  //test 03
  it("User not found", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      username: "HS",
      password: "hansana",
    });
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toEqual("User not found");
  });

  //test 04
  it("Invalid Password", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      username: "HSDE",
      password: "han",
    });
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toEqual("Invalid Password");
  });

  //test 05
  it("successfully loged", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      username: "nemalP",
      password: "012345",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toEqual("Login");
  });

  // Add more tests here for other validation scenarios
});
afterAll(async () => {
  await mongoose.connection.close();
});
