const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://aljunepio:Secretlang1@aljur.mnvit.mongodb.net/todos?retryWrites=true&w=majority&appName=Aljur",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", TaskSchema);
// Add this inside your routes
app.get('/test-db', async (req, res) => {
    try {
        const isConnected = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
        res.status(200).send(`MongoDB is ${isConnected}`);
    } catch (error) {
        res.status(500).send('Database connection issue');
    }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).send("Task deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
