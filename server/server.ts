import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import connectDB from "./config/connectDB.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import AuthRouter from "./routes/auth.route.js";

declare module "express-session" {
  interface sessionData {
    isLoggedIn: boolean;
    userId: string;
  }
}

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Body parser middleware - MUST come before session and routes
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI as string,
      collectionName: "sessions",
    }),
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});

app.use("/api/auth", AuthRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
