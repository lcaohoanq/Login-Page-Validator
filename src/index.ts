import dotenv from "dotenv";
import express from "express";
import databaseService from "./services/database.services";
dotenv.config();

const app = express();
const port = process.env.PORT || 1604;

databaseService.connect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
