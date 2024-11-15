const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female"] },
  status: { type: String, required: true, enum: ["Active", "Inactive"] },
});

module.exports = mongoose.model("Employee", employeeSchema);
