const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create a new task
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ id: req.params.id });
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.status(200).send("Task deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete all tasks
router.delete("/", async (req, res) => {
  try {
    await Task.deleteMany();
    res.status(200).send("All tasks deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
