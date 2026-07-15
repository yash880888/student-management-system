const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const studentRoutes = require("./models/student");
const teacherRoutes = require("./models/Teacher");
const feeRoutes = require("./models/fees");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

async function connect() {

  try {
    const response = await mongoose.connect(process.env.MONGO);
    console.log("Database Connected");


  } catch (error) {
    console.log("error in database connection");

  }
}
connect();


app.use("/", studentRoutes);
app.use("/", teacherRoutes);
app.use("/", feeRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});