import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import connectDB from "./config/connectDB.js";

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
