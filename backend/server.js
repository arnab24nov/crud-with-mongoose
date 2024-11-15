const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const employeeRoutes = require("./Routes/employeeRoutes");

const app = express();

// Load environment variable
dotenv.config();

//Connecting with database
require("./db");

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/employees", employeeRoutes);

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listing from port ${PORT}`);
});
