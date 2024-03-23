// test('Sample Test', () => {
//     expect(1 + 1).toBe(2);
//   });

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

//routes for testing the API
app.post("/api/auth/signup", userRegisterControler);
app.post("/api/auth/login", loginControl);

//test cases for user Registration
describe("POST /api/auth/signup", () => {
  //test 01
  it("should require a firstname", async () => {
    const response = await supertest(app).post("/api/auth/signup").send({
      lastname: "Perera",
      email: "nemal@gmail.com",
      username: "nemalP",
      password: "password123",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual("First name is required");
  });

  //test 02
  it("should require a lastname", async () => {
    const response = await supertest(app).post("/api/auth/signup").send({
      firstname: "Nirmal",
      email: "nemal@gmail.com",
      username: "nemalP",
      password: "password123",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual("lastname is required");
  });

  //test 03
  it("should require a email", async () => {
    const response = await supertest(app).post("/api/auth/signup").send({
      firstname: "Nirmal",
      lastname: "Perera",
      username: "nemalP",
      password: "password123",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual("email is required");
  });

  //test 04
  it("should require a username", async () => {
    const response = await supertest(app).post("/api/auth/signup").send({
      firstname: "Nirmal",
      lastname: "Perera",
      email: "nemal@gmail.com",
      password: "password123",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual("username is required");
  });

  //test 05
  it("should require a password", async () => {
    const response = await supertest(app).post("/api/auth/signup").send({
      firstname: "Nirmal",
      lastname: "Perera",
      email: "nemal@gmail.com",
      username: "nemalP",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(
      "password is required and 6 charector long"
    );
  });

  //test 06
  it("should require a password with morethan 5 charectors", async () => {
    const response = await supertest(app).post("/api/auth/signup").send({
      firstname: "Nirmal",
      lastname: "Perera",
      email: "nemal@gmail.com",
      username: "nemalP",
      password: "01234",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(
      "password is required and 6 charector long"
    );
  });

  //test 07
  it("should User is Already Registered", async () => {
    const response = await supertest(app).post("/api/auth/signup").send({
      firstname: "Nirmal",
      lastname: "Perera",
      email: "nemmalllll@gmail.com",
      username: "nemalPp",
      password: "password123",
    });
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toEqual(
      "User Already Registered with This Email"
    );
  }, 10000);

  //test 08
  it("Successfully registered to the system", async () => {
    const newUser = {
      firstname: "Test",
      lastname: "User",
      email: "testusrer@example.com", // Ensure this is unique for each test
      username: "testuser",
      password: "password123",
    };

    const response = await supertest(app)
      .post("/api/auth/signup")
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      success: true,
      message: "Registration Successful please login",
    });
  });
});

//test cases for user login
// describe('POST /api/auth/login', () => {
//   it('should require a firstname', async () => {
//     const response = await supertest(app)
//       .post('/api/auth/signup')
//       .send({
//         lastname: 'Doe',
//         email: 'john@example.com',
//         username: 'johnDoe',
//         password: 'password123',
//       });
//     expect(response.statusCode).toBe(400);
//     expect(response.body.message).toEqual('First name is required');
//   });

//   // Add more tests here for other validation scenarios
// });
afterAll(async () => {
  await mongoose.connection.close();
});
