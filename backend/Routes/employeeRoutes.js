const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

// Create a new employee
router.post("/", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a employee by ID
router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a employee by ID
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
