// server.js
import express from "express";
import { connect, Schema, model } from "mongoose";
const app = express();
const PORT = 5000;

// Connect to MongoDB
connect(
  "mongodb+srv://mustafa:abdeali52@cluster0.gmqwj36.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define a sample chart schema
const chartSchema = new Schema({
  name: String,
  data: [{ label: String, value: Number }],
});

// Create a chart model
const Chart = model("Chart", chartSchema);

// Define a sample route to fetch chart data
app.get("/api/charts", async (req, res) => {
  try {
    const charts = await Chart.find();
    res.json(charts);
  } catch (error) {
    console.error("Error fetching charts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
