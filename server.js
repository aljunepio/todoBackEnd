const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/tasks", taskRoutes);
// app.get('/test-db', async (req, res) => {
//   try {
//         const isConnected = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
//     res.status(200).send(`MongoDB is ${isConnected}`);
//   } catch (error) {
//         res.status(500).send('Database connection issue');
//   }
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
