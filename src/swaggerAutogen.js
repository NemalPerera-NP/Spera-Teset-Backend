// const swaggerAutogen = require("swagger-autogen");
// const dotenv = require("dotenv");
// dotenv.config();

// //PORT
// const PORT = process.env.PORT || 8080;
// const outputFile = "../swagger_output.json"; // The output file for the Swagger documentation
// const endpointsFiles = ["./routes/cryptoRotes", "./routes/UserRoutes"]; // Paths to the files containing your route definitions

// const doc = {
//   openapi: "3.0.0",
//   info: {
//     title: "Crypto Price Site API",
//     description: "API project for Spera Labs",
//     version: "1.0.0"
//   },
//   servers: [
//     {
//       url: `http://localhost:${PORT}/`,
//       description: "Development server"
//     },
//   ]
// };

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//   console.log("Swagger documentation generated!");
// });
