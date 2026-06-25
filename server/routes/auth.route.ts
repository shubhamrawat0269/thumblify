import express from "express";
import {
  logoutUser,
  loginUser,
  registerUser,
  verifyUser,
} from "../controllers/auth.controller.js";
import protect from "../middlewares/auth.middleware.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", registerUser);
AuthRouter.post("/login", loginUser);
AuthRouter.get("/verify", protect, verifyUser);
AuthRouter.post("/logout", protect, logoutUser);

export default AuthRouter;
