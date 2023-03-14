require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todoRoutes = require("./src/routes/todo.routes");
const db = require("./src/config/dbConfig");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Working home route");
});

app.use("/api", todoRoutes);

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySql Locally");
});

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
